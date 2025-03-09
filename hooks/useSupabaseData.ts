import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  description: string | null;
  category: string | null;
  created_at: string;
};

export type AudioFile = {
  id: string;
  book_id: string;
  chapter_number: number;
  chapter_title: string;
  file_url: string;
  duration: number;
  created_at: string;
};

export type UserProgress = {
  id: string;
  user_id: string;
  book_id: string;
  chapter_number: number;
  position: number;
  is_completed: boolean;
  last_accessed: string;
};

// Hook to fetch all books
export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBooks(data as Book[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
}

// Hook to fetch a single book with its audio files
export function useBook(bookId: string | null) {
  const [book, setBook] = useState<Book | null>(null);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!bookId) {
      setLoading(false);
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        // Fetch book details
        const { data: bookData, error: bookError } = await supabase
          .from('books')
          .select('*')
          .eq('id', bookId)
          .single();

        if (bookError) throw bookError;
        setBook(bookData as Book);

        // Fetch audio files for this book
        const { data: audioData, error: audioError } = await supabase
          .from('audio_files')
          .select('*')
          .eq('book_id', bookId)
          .order('chapter_number', { ascending: true });

        if (audioError) throw audioError;
        setAudioFiles(audioData as AudioFile[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  return { book, audioFiles, loading, error };
}

// Hook to manage user progress
export function useUserProgress(userId: string | null, bookId: string | null) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId || !bookId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('book_id', bookId)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" error code, which just means no progress yet
          throw error;
        }

        setProgress(data as UserProgress);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [userId, bookId]);

  // Function to update progress
  const updateProgress = async (chapterNumber: number, position: number, isCompleted = false) => {
    if (!userId || !bookId) return null;

    try {
      // If progress exists, update it
      if (progress) {
        const { data, error } = await supabase
          .from('user_progress')
          .update({
            chapter_number: chapterNumber,
            position: position,
            is_completed: isCompleted,
            last_accessed: new Date().toISOString(),
          })
          .eq('id', progress.id)
          .select()
          .single();

        if (error) throw error;
        setProgress(data as UserProgress);
        return data;
      } else {
        // If no progress exists, create a new record
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            book_id: bookId,
            chapter_number: chapterNumber,
            position: position,
            is_completed: isCompleted,
            last_accessed: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) throw error;
        setProgress(data as UserProgress);
        return data;
      }
    } catch (err) {
      setError(err as Error);
      return null;
    }
  };

  return { progress, loading, error, updateProgress };
}

// Hook to get user in-progress books
export function useUserBooks(userId: string | null) {
  const [inProgressBooks, setInProgressBooks] = useState<Array<Book & { progress: UserProgress }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserBooks = async () => {
      try {
        setLoading(true);
        // Join user_progress with books to get in-progress books
        const { data, error } = await supabase
          .from('user_progress')
          .select(`
            *,
            books:book_id(*)
          `)
          .eq('user_id', userId)
          .order('last_accessed', { ascending: false });

        if (error) throw error;

        // Transform the data to a more usable format
        const transformedData = data.map((item) => ({
          ...item.books,
          progress: {
            id: item.id,
            user_id: item.user_id,
            book_id: item.book_id,
            chapter_number: item.chapter_number,
            position: item.position,
            is_completed: item.is_completed,
            last_accessed: item.last_accessed,
          },
        }));

        setInProgressBooks(transformedData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBooks();
  }, [userId]);

  return { inProgressBooks, loading, error };
}