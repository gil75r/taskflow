import { Sun, Moon, Monitor } from 'lucide-react';
import
{
    useSettings,
    type ThemePreference
} from '../context/SettingsContext';

const themeOptions=
[
    {
        value: 'light',
        label: 'Light',
        description: 'Always use light appearance',
        icon: Sun
    },
    {
        value: 'dark',
        label: 'Dark',
        description: 'Always use dark appearance',
        icon: Moon
    },
    {
        value: 'system',
        label: 'System',
        description: 'Match your device settings',
        icon: Monitor
    }
] as const;

export default function Settings()
{
    const { theme, setTheme, isDark }=useSettings();

    return (
        <div className="settings-page">
            <div className="settings-page-header">
                <h1>Settings</h1>
                <p>Customize your TaskFlow experience</p>
            </div>

            <section className="settings-section">
                <div className="settings-section-heading">
                    <h2>Appearance</h2>
                    <p>Choose your preferred theme</p>
                </div>

                <div
                    className="theme-options"
                    role="radiogroup"
                    aria-label="Theme preference"
                >
                {
                    themeOptions.map(option=>
                    {
                        const Icon=option.icon;
                        const isSelected=theme===option.value;

                        return(
                            <label
                                key={option.value}
                                className={`theme-option
                                ${
                                    isSelected ? 'theme-option-selected' : ''
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    value={option.value}
                                    checked={isSelected}
                                    onChange={()=>
                                        setTheme(option.value as ThemePreference)
                                    }
                                />

                                <span className="theme-option-icon">
                                    <Icon size={22}/>
                                </span>

                                <span className="theme-option-details">
                                    <strong>{option.label}</strong>
                                    <small>{option.description}</small>
                                </span>
                            </label>
                        );
                    })
                }
                </div>

                <p className="settings-current-theme">
                    Current appearance: {isDark ? 'Dark' : 'Light'}
                </p>
            </section>

            <section className="settings-section">
                <div className="settings-section-heading">
                    <h2>About TaskFlow</h2>
                    <p>Application information</p>
                </div>

                <div className="settings-about">
                    <div>
                        <span>Application</span>
                        <strong>TaskFlow</strong>
                    </div>

                    <div>
                        <span>Storage</span>
                        <strong>Local Browser Storage</strong>
                    </div>

                    <div>
                        <span>Theme preference</span>
                        <strong>{theme}</strong>
                    </div>
                </div>
            </section>
        </div>
    );
}