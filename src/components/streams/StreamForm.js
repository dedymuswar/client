import React from 'react';
import { Field, reduxForm } from 'redux-form'


class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error)
        {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput = (formProps) => {
        // console.log(formProps);
        // console.log(formProps.meta);

        return (
            <div className="field">
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }

    render() {
        // console.log(this.props);
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button type="submit" className="ui button primary">Submit</button>
            </form>
        )
    }
}
// Validasi input setelah itu lihat baris 55
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title)
    {
        errors.title = 'anda harus mengisi title';
    }
    if (!formValues.description)
    {
        errors.description = 'anda harus mengisi deskripsi'
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm', 
    validate: validate
})(StreamForm)