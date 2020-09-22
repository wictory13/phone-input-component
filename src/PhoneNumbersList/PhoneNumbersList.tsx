import React from 'react';
import './PhoneNumbersList.css';

interface PhoneNumbersListProps {
    phoneNumbers: string[];
}

export class PhoneNumbersList extends React.Component<PhoneNumbersListProps, unknown> {
    render(): JSX.Element {
        return (
            <ul>{this.props.phoneNumbers.map(number => <li>{number}</li>)}</ul>
        );
    }
}
