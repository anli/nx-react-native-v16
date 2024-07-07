import { useCallback, useEffect, useState } from 'react';
import { MMKV, useMMKVString, useMMKVObject } from 'react-native-mmkv';

const instance = new MMKV();

const handleValue = <T>(key: string, value: T | undefined) => {
  if (value == null) {
    instance.delete(key);
    return undefined;
  } else {
    const jsonV = JSON.stringify(value);
    instance.set(key, jsonV);
    return value;
  }
};

export const useArray = <T>(
  key: string
): [T, (value: React.SetStateAction<T | undefined>) => void] => {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const strV = instance.getString(key);
    if (strV != null) {
      setValue(JSON.parse(strV) as T);
    } else {
      setValue(undefined);
    }
  }, [key]);

  const setArrValue = useCallback(
    (v: React.SetStateAction<T | undefined>) => {
      if (typeof v === 'function') {
        const callback = v as (prevState: T | undefined) => T | undefined;
        setValue(handleValue(key, callback(value)));
        return;
      }

      setValue(handleValue(key, v));
    },
    [key, value]
  );

  return [value as T, setArrValue];
};

export const storage = Object.assign(instance, {
  useString: (key: string) => useMMKVString(key, instance),
  useObject: (key: string) => useMMKVObject(key, instance),
  useArray,
});
