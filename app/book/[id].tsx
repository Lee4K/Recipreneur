import React from 'react';
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBook } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { useUserProgress } from '@/hooks/useSupabaseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const bookId = typeof id === 'string' ? id : null;
  const { book, audioFiles, loading, error } = useBook(bookId);
  const { user } = useAuth();
  const { progress } = useUserProgress(user?.id || null, bookId);
  const colorScheme = useColorScheme() ?? 'light';

  // Function to format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartListening = () => {
    if (bookId && audioFiles.length > 0) {
      // If there's user progress, continue from the last position
      if (progress) {
        router.push(`/player/${bookId}?chapter=${progress.chapter_number}&position=${progress.position}`);
      } else {
        // Otherwise start from the beginning
        router.push(`/player/${bookId}?chapter=1&position=0`);
      }
    }
  };

  const handleChapterPress = (chapterNumber: number) => {
    router.push(`/player/${bookId}?chapter=${chapterNumber}&position=0`);
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
      </ThemedView>
    );
  }

  if (error || !book) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText>An error occurred while loading the book.</ThemedText>
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

      <ScrollView>
        <ThemedView style={styles.header}>
          <Image 
            source={{ uri: book.cover_url || 'https://via.placeholder.com/150' }} 
            style={styles.coverImage} 
            resizeMode="cover"
          />
          <ThemedView style={styles.bookInfo}>
            <ThemedText type="title" style={styles.title}>{book.title}</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.author}>By {book.author}</ThemedText>
            
            {progress && (
              <ThemedView style={styles.progressContainer}>
                <ThemedText>
                  {progress.is_completed ? 'Completed' : `Chapter ${progress.chapter_number}`}
                </ThemedText>
              </ThemedView>
            )}
            
            <TouchableOpacity
              style={[styles.listenButton, { backgroundColor: Colors[colorScheme].tint }]}
              onPress={handleStartListening}
            >
              <ThemedText style={styles.buttonText}>
                {progress ? 'Continue Listening' : 'Start Listening'}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {book.description && (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Description</ThemedText>
            <ThemedText style={styles.description}>{book.description}</ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Chapters</ThemedText>
          <ThemedView style={styles.chaptersList}>
            {audioFiles.map((chapter) => (
              <TouchableOpacity 
                key={chapter.id} 
                style={styles.chapterItem}
                onPress={() => handleChapterPress(chapter.chapter_number)}
              >
                <ThemedView style={styles.chapterInfo}>
                  <ThemedText type="defaultSemiBold">
                    Chapter {chapter.chapter_number}: {chapter.chapter_title}
                  </ThemedText>
                  <ThemedText>{formatDuration(chapter.duration)}</ThemedText>
                </ThemedView>
                {progress && progress.chapter_number === chapter.chapter_number && !progress.is_completed && (
                  <ThemedView style={styles.inProgressBadge}>
                    <ThemedText style={styles.inProgressText}>IN PROGRESS</ThemedText>
                  </ThemedView>
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 100, // Extra padding for the header
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  author: {
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  listenButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
  },
  chaptersList: {
    marginTop: 8,
  },
  chapterItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  chapterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inProgressBadge: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  inProgressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});