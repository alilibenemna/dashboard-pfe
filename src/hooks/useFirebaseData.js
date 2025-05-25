import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase-config';

/**
 * Custom hook to fetch and subscribe to Firebase Realtime Database data
 * @param {string} path - The database path to fetch data from
 * @returns {Object} - The data, loading state, and error state
 */
const useFirebaseData = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dbRef = ref(db, path);
    
    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData(null);
      }
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [path]);

  return { data, loading, error };
};

export default useFirebaseData; 