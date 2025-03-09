import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Image, 
  Platform, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useBooks } from '@/hooks/useSupabaseData';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import supabase from '@/lib/supabase';

type Category = {
  name: string;
  count: number;
};

export default function ExploreScreen() {
  const { books, loading } = useBooks();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    if (books && books.length > 0) {
      // Extract categories from books and count them
      const categoryCount: Record<string, number> = {};
      books.forEach(book => {
        if (book.category) {
          categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
        }
      });

      // Convert to array for display
      const categoriesArray = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count
      }));

      // Sort by count (descending)
      categoriesArray.sort((a, b) => b.count - a.count);
      
      setCategories(categoriesArray);
    }
  }, [books]);

  const filteredBooks = selectedCategory 
    ? books.filter(book => book.category === selectedCategory)
    : books;

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

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.name && { 
          backgroundColor: Colors[colorScheme].tint,
        }
      ]}
      onPress={() => setSelectedCategory(
        selectedCategory === item.name ? null : item.name
      )}
    >
      <ThemedText
        style={[
          styles.categoryText,
          selectedCategory === item.name && { color: '#FFFFFF' }
        ]}
      >
        {item.name} ({item.count})
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      {/* Categories */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Categories</ThemedText>
        
        {loading ? (
          <ActivityIndicator size="small" color={Colors[colorScheme].tint} />
        ) : categories.length > 0 ? (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        ) : (
          <ThemedText style={styles.emptyText}>
            No categories available
          </ThemedText>
        )}
      </ThemedView>

      {/* Books */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText type="subtitle">
            {selectedCategory ? `${selectedCategory} Books` : 'All Books'}
          </ThemedText>
          
          {selectedCategory && (
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <ThemedText type="link">Clear Filter</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
        
        {loading ? (
          <ActivityIndicator size="small" color={Colors[colorScheme].tint} />
        ) : filteredBooks.length > 0 ? (
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id}
            renderItem={renderBookItem}
            numColumns={2}
            contentContainerStyle={styles.bookGrid}
            columnWrapperStyle={styles.bookRow}
          />
        ) : (
          <ThemedText style={styles.emptyText}>
            No books available in this category
          </ThemedText>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoriesList: {
    paddingVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    marginRight: 8,
  },
  categoryText: {
    fontWeight: '500',
  },
  bookGrid: {
    paddingTop: 8,
  },
  bookRow: {
    justifyContent: 'space-between',
  },
  bookItem: {
    width: '48%',
    marginBottom: 20,
  },
  bookCover: {
    width: '100%',
    aspectRatio: 2/3,
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});