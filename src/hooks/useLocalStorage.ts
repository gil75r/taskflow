import { useEffect, useState } from 'react';

export function useLocalStorage<T>
(
  key: string,
  initialValue: T
)
{
    const [value, setValue]=useState<T>(()=>
    {
        try
        {
            const storedValue=localStorage.getItem(key);

            return storedValue!==null
                ? JSON.parse(storedValue) as T
                : initialValue;
        }
        catch(error)
        {
            console.error('Error reading localStorage:', error);
            return initialValue;
        }
    });

    useEffect(()=>
    {
        try
        {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch(error)
        {
            console.error('Error saving localStorage:', error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}