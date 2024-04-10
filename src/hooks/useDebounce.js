import { debounce } from 'lodash';
import { useCallback } from 'react';

const useDebounce = (callback, debounceTime = 1000) => {
    return useCallback(debounce(callback, debounceTime), []);
};

export default useDebounce;