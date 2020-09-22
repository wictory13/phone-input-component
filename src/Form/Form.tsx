import React from 'react';
import InputMask from 'react-input-mask';
import "./Form.css";
import {InputStatuses} from "../Utils/InputStatuses";

const phoneRegexp = /\+7-9\d{2}-\d{3}-\d{2}-\d{2}/;

interface FormProps {
    onAddNewPhoneNumber: (number: string) => void;
    phoneNumbers: string[];
}

interface FormState {
    value: string;
    status: InputStatuses;
    hint: string;
    disabledAddButton: boolean;
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            value: "",
            status: InputStatuses.Default,
            hint: "Введите номер",
            disabledAddButton: false
        };
    }

    componentDidUpdate(prevProps: FormProps, prevState: FormState): void {
        if (this.state.value !== prevState.value) {
            this.setState({value: this.state.value});
        }
    }

    changeFormState = (newPhone: string): void => {
        if (newPhone.match(phoneRegexp)) {
            if (this.props.phoneNumbers.includes(newPhone)) {
                this.setState({
                    status: InputStatuses.Default,
                    hint: "Такой номер уже есть в базе",
                    disabledAddButton: true
                });
            } else {
                this.setState({
                    status: InputStatuses.NewNumber,
                    hint: "Такого номера нет в базе, но его можно добавить",
                    disabledAddButton: false
                });
            }
        } else {
            this.setState({status: InputStatuses.Error, hint: "Введите номер", disabledAddButton: true});
        }
    };

    onAddNewPhoneNumber = (newPhone: string): void => {
        if (this.state.status !== "error") {
            this.props.onAddNewPhoneNumber(newPhone);
        }
        this.setState({value: "", status: InputStatuses.Default, hint: "Введите номер", disabledAddButton: false});
    };

    render(): JSX.Element {
        return (
            <div className="form">
                <InputMask className={`input ${this.state.status}`} mask="+7-\999-999-99-99" value={this.state.value}
                           onChange={(event) => {
                               this.setState({value: event.target.value});
                               this.changeFormState(event.target.value);
                           }}/>
                <button disabled={this.state.disabledAddButton} className="add-button"
                        onClick={() => {
                            this.changeFormState(this.state.value);
                            this.onAddNewPhoneNumber(this.state.value);
                        }}>
                    Добавить
                </button>
                <div className="hint">{this.state.hint}</div>
            </div>
        );
    }
}
