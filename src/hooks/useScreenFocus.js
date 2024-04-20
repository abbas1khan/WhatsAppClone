import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';

const useScreenFocus = (callback, debounceTime) => {
    const navigation = useNavigation();

    useEffect(() => {
        if (debounceTime) {
            const debouncedCallback = debounce(callback, debounceTime);

            const unsubscribe = navigation.addListener('focus', () => {
                debouncedCallback();
            });

            const blurUnsubscribe = navigation.addListener('blur', () => {
                debouncedCallback.cancel();
            });

            return () => {
                unsubscribe();
                blurUnsubscribe();
            };
        } else {
            const unsubscribe = navigation.addListener('focus', () => {
                if (callback) {
                    callback();
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [navigation]);
};

export default useScreenFocus;
