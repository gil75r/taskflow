import
{
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type ThemePreference='light' | 'dark' | 'system';

interface SettingsContextType
{
    theme: ThemePreference;
    setTheme: (theme: ThemePreference)=> void;
    isDark: boolean;
}

const SettingsContext=createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider
({
    children
}:
{
    children: ReactNode;
})
{
    const [theme, setTheme]=useLocalStorage<ThemePreference>
    (
        'taskflow-theme',
        'system'
    );

    const [systemDark, setSystemDark]=useState(()=>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(()=>
    {
        const mediaQuery=window.matchMedia
        (
            '(prefers-color-scheme: dark)'
        );

        function handleSystemThemeChange(event: MediaQueryListEvent)
        {
            setSystemDark(event.matches);
        }

        mediaQuery.addEventListener
        (
            'change',
            handleSystemThemeChange
        );

        return ()=>
        {
            mediaQuery.removeEventListener
            (
                'change',
                handleSystemThemeChange
            );
        };
    }, []);

    const isDark=theme==='system'
        ? systemDark
        : theme==='dark';

    useEffect(()=>
    {
        document.documentElement.dataset.theme=isDark ? 'dark' : 'light';
    }, [isDark]);

    return(
        <SettingsContext.Provider
            value={{ theme, setTheme, isDark }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings()
{
    const context=useContext(SettingsContext);

    if(!context)
    {
        throw new Error
        (
            'useSettings must be used inside SettingsProvider'
        );
    }

    return context;
}