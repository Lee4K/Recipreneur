import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBook } from '@/hooks/useSupabaseData';
import { useUserProgress } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function PlayerScreen() {
  const { id, chapter: chapterParam, position: positionParam } = useLocalSearchParams();
  const bookId = typeof id === 'string' ? id : null;
  const initialChapter = typeof chapterParam === 'string' ? parseInt(chapterParam, 10) : 1;
  const initialPosition = typeof positionParam === 'string' ? parseInt(positionParam, 10) : 0;
  
  const { book, audioFiles, loading, error } = useBook(bookId);
  const { user } = useAuth();
  const { updateProgress } = useUserProgress(user?.id || null, bookId);
  const colorScheme = useColorScheme() ?? 'light';

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(initialChapter);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(initialPosition);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  // Find the current audio file based on the current chapter
  const currentAudioFile = audioFiles.find(file => file.chapter_number === currentChapter);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Load sound when component mounts or chapter changes
  useEffect(() => {
    loadAudio();

    // Unload sound when component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentChapter]);

  // Save progress every 5 seconds
  useEffect(() => {
    if (!isSeeking && position > 0 && user?.id && bookId) {
      const timer = setTimeout(() => {
        updateProgress(currentChapter, position, false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [position, user?.id, bookId, currentChapter, isSeeking]);

  // Update position
  useEffect(() => {
    if (sound && isPlaying && !isSeeking) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis / 1000);
          
          // If we're at the end of the audio, move to the next chapter
          if (status.didJustFinish) {
            handleNextChapter();
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound, isPlaying, isSeeking]);

  const loadAudio = async () => {
    if (!currentAudioFile) {
      Alert.alert('Error', 'Audio file not found');
      return;
    }

    setIsLoading(true);

    // Unload previous sound if exists
    if (sound) {
      await sound.unloadAsync();
    }

    try {
      // Request audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      // Load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentAudioFile.file_url },
        { shouldPlay: false, positionMillis: initialPosition * 1000 },
        onPlaybackStatusUpdate
      );
      
      setSound(newSound);
      setIsLoading(false);
      
      // Auto-play when loaded
      if (initialPosition === 0) {
        playSound();
      }
    } catch (error) {
      console.error('Error loading audio:', error);
      Alert.alert('Error', 'Failed to load audio');
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      if (!isSeeking) {
        setPosition(status.positionMillis / 1000);
      }
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pauseSound();
    } else {
      await playSound();
    }
  };

  const handleSeek = async (value: number) => {
    if (sound) {
      setIsSeeking(true);
      setPosition(value);
    }
  };

  const handleSeekComplete = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
      setIsSeeking(false);
      
      // If we were playing before seeking, resume playback
      if (isPlaying) {
        await sound.playAsync();
      }
    }
  };

  const handlePreviousChapter = async () => {
    if (currentChapter > 1) {
      // Save progress for current chapter
      await updateProgress(currentChapter, position, false);
      
      // Move to previous chapter
      setCurrentChapter(prev => prev - 1);
      setPosition(0);
    }
  };

  const handleNextChapter = async () => {
    if (currentChapter < audioFiles.length) {
      // Mark current chapter as completed
      await updateProgress(currentChapter, duration, true);
      
      // Move to next chapter
      setCurrentChapter(prev => prev + 1);
      setPosition(0);
    } else {
      // This was the last chapter, mark the book as completed
      await updateProgress(currentChapter, duration, true);
      Alert.alert('Congratulations!', 'You have completed this audiobook.', [
        { text: 'Back to Book', onPress: () => router.back() }
      ]);
    }
  };

  const handleSkipForward = async () => {
    if (sound) {
      const newPosition = Math.min(position + 30, duration);
      await sound.setPositionAsync(newPosition * 1000);
      setPosition(newPosition);
    }
  };

  const handleSkipBackward = async () => {
    if (sound) {
      const newPosition = Math.max(position - 10, 0);
      await sound.setPositionAsync(newPosition * 1000);
      setPosition(newPosition);
    }
  };

  if (loading || !book || !currentAudioFile) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ 
        headerTitle: '',
        headerShown: true,
        headerTransparent: true,
      }} />

      <ThemedView style={styles.content}>
        <Image 
          source={{ uri: book.cover_url || 'https://via.placeholder.com/300' }} 
          style={styles.coverImage} 
        />

        <ThemedView style={styles.infoContainer}>
          <ThemedText type="title" style={styles.title}>{book.title}</ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.author}>{book.author}</ThemedText>
          <ThemedText style={styles.chapter}>
            Chapter {currentAudioFile.chapter_number}: {currentAudioFile.chapter_title}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={handleSeek}
            onSlidingComplete={handleSeekComplete}
            minimumTrackTintColor={Colors[colorScheme].tint}
            maximumTrackTintColor="#CCCCCC"
            thumbTintColor={Colors[colorScheme].tint}
            disabled={isLoading}
          />
          <ThemedView style={styles.timeContainer}>
            <ThemedText style={styles.timeText}>{formatTime(position)}</ThemedText>
            <ThemedText style={styles.timeText}>-{formatTime(duration - position)}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={handlePreviousChapter}
            disabled={currentChapter === 1 || isLoading}
          >
            <ThemedText style={[styles.controlIcon, currentChapter === 1 ? styles.disabledButton : {}]}>
              ⏮
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={handleSkipBackward}
            disabled={isLoading}
          >
            <ThemedText style={styles.controlIcon}>-10s</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playPauseButton} 
            onPress={handlePlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.playPauseIcon}>
                {isPlaying ? '⏸' : '▶️'}
              </ThemedText>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={handleSkipForward}
            disabled={isLoading}
          >
            <ThemedText style={styles.controlIcon}>+30s</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={handleNextChapter}
            disabled={currentChapter === audioFiles.length || isLoading}
          >
            <ThemedText style={[styles.controlIcon, currentChapter === audioFiles.length ? styles.disabledButton : {}]}>
              ⏭
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 100, // Extra space for header
  },
  coverImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 8,
    marginBottom: 30,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    marginBottom: 12,
    textAlign: 'center',
  },
  chapter: {
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 30,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlButton: {
    padding: 10,
  },
  controlIcon: {
    fontSize: 24,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseIcon: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  disabledButton: {
    opacity: 0.3,
  },
});