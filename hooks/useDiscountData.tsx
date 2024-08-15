import {SOCKET_URL} from '@env';
import {useState, useEffect} from 'react';
import {triggerNotification} from '../utils/notificationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DISCOUNT_OFFERS_KEY = 'discountOffers';

export const useDiscountData = () => {
  const [discountOffers, setDiscountOffers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const loadDiscountOffers = async () => {
      try {
        const cachedOffers = await AsyncStorage.getItem(DISCOUNT_OFFERS_KEY);
        if (cachedOffers) {
          setDiscountOffers(JSON.parse(cachedOffers));
        }
      } catch (error) {
        console.error('Error loading discount offers from cache:', error);
      }
    };

    loadDiscountOffers();
  }, []);

  useEffect(() => {
    const saveDiscountOffers = async () => {
      try {
        await AsyncStorage.setItem(
          DISCOUNT_OFFERS_KEY,
          JSON.stringify(discountOffers),
        );
      } catch (error) {
        console.error('Error saving discount offers to cache:', error);
      }
    };

    saveDiscountOffers();
  }, [discountOffers]);

  const connectWebSocket = () => {
    try {
      const socketUrl = SOCKET_URL;
      const newSocket = new WebSocket(`${socketUrl}12454`);
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log('WebSocket connection established');
        setError(null);
      };

      newSocket.onmessage = event => {
        const data: {discount_offer: string} = JSON.parse(event.data);
        setDiscountOffers(prevOffers => {
          const newOffers = [...prevOffers, data.discount_offer];
          return newOffers;
        });
        triggerNotification(data.discount_offer);
        console.log('====================================');
        console.log(data.discount_offer);
        console.log('====================================');
      };

      newSocket.onerror = error => {
        setError('WebSocket error: ' + error.message);
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
        setError(null);
      };
    } catch (error) {
      setError(
        'Error establishing WebSocket connection: ' + (error as Error).message,
      );
    }
  };

  const disconnectWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  return {
    discountOffers,
    error,
    connectWebSocket,
    disconnectWebSocket,
  };
};
