import type { ReactNode } from 'react';

interface AnalyticsCardProps
{
    title: string;
    value: string | number;
    description: string;
    icon: ReactNode;
}

export default function AnalyticsCard
({
    title,
    value,
    description,
    icon
}: AnalyticsCardProps)
{
    return(
        <div className="analytics-card">
            <div className="analytics-card-top">
                <span>{title}</span>
                <div className="analytics-card-icon">
                    {icon}
                </div>
            </div>

            <strong className="analytics-card-value">
                {value}
            </strong>

            <p>{description}</p>
        </div>
    );
}