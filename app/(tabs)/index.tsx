import React from 'react';
import { 
  StyleSheet, 
  Image, 
  Platform, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator,
  View
} from 'react-native';
import { router } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBooks, useUserBooks } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const { books, loading: booksLoading } = useBooks();
  const { user } = useAuth();
  const { inProgressBooks, loading: progressLoading } = useUserBooks(user?.id || null);
  const colorScheme = useColorScheme() ?? 'light';

  const handleBookPress = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.bookItem} 
      onPress={() => handleBookPress(item.id)}
    >
      <Image 
        source={{ uri: item.cover_url || 'https://via.placeholder.com/150' }} 
        style={styles.bookCover} 
      />
      <ThemedText 
        numberOfLines={2} 
        style={styles.bookTitle}
      >
        {item.title}
      </ThemedText>
      <ThemedText 
        numberOfLines={1} 
        style={styles.bookAuthor}
      >
        {item.author}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Continue Listening Section */}
      {user && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Continue Listening</ThemedText>
          
          {progressLoading ? (
            <ActivityIndicator size="small" color={Colors[colorScheme].tint} />
          ) : inProgressBooks.length > 0 ? (
            <FlatList
              data={inProgressBooks}
              keyExtractor={(item) => item.id}
              renderItem={renderBookItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.booksList}
            />
          ) : (
            <ThemedText style={styles.emptyText}>
              No books in progress yet. Start listening to a book!
            </ThemedText>
          )}
        </ThemedView>
      )}

      {/* All Books Section */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">All Books</ThemedText>
        
        {booksLoading ? (
          <ActivityIndicator size="small" color={Colors[colorScheme].tint} />
        ) : books.length > 0 ? (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={renderBookItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
          />
        ) : (
          <ThemedText style={styles.emptyText}>
            No books available yet. Check back later!
          </ThemedText>
        )}
      </ThemedView>

      {/* Account Info */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Your Account</ThemedText>
        
        {user ? (
          <ThemedView style={styles.userInfo}>
            <ThemedText>Logged in as: {user.email}</ThemedText>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/profile')}
            >
              <ThemedText type="link">View Profile</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView style={styles.userInfo}>
            <TouchableOpacity
              style={[styles.authButton, { backgroundColor: Colors[colorScheme].tint }]}
              onPress={() => router.push('/auth/login')}
            >
              <ThemedText style={styles.authButtonText}>Login</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.authButton, styles.signupButton]}
              onPress={() => router.push('/auth/signup')}
            >
              <ThemedText type="link">Sign Up</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  booksList: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  bookItem: {
    width: 120,
    marginRight: 16,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    opacity: 0.7,
  },
  emptyText: {
    marginTop: 12,
    fontStyle: 'italic',
  },
  userInfo: {
    marginTop: 12,
  },
  profileButton: {
    marginTop: 8,
  },
  authButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});