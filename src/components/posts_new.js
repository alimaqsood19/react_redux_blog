import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
//reduxForm function allows our component to communicate with the reducer that we wired in under reducers
//very similar to the connect() from react-redux, component talk directly to redux store
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/index.js';

class PostsNew extends Component {

    renderField(field) {//field object contains event handlers taht we need to wire up to the JSX we are rendering
        
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        
        return ( //the field object basically ensures the Field component below knows its responsible for the changes made in this JSX input                        
            <div className={className}>
                <label>{field.label}</label>              
                <input
                    className="form-control"
                    type="text" 
                    {...field.input}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error: ''}
                </div>
                {/*meta.error property automaticaly added to field object from the validate function*
                the 'name' property on the Field component is what connects validate() to the field, displaying
                any errors that match the 'name' property on the errors object, so if errors.name has something in it
                it will render the error message on the specified 'name' property under Field component. 
                ----field.meta.touched, the touched state, if it is in touched state then show error message, otherwise
                show an empty string, this prevents the error messages from appearing prematurely and only appear after
                user has focused away form the input */}
            </div>
        );
    }

    //field.input is an object that contains a bunch of diff event handlers and props, (onChange etc), also the value of the input
    //all the different properties on field.input are copied from it to the input
    //spread (...) operator to copy enumerable properties from one object to another 
    //Can pass arbitrary properties to the Field component, this in turn will be accessible on the field argument in the
    //renderField() function, in this case we passed label as an argument that can be accessed by field.label

    //------executed after form is validated by handleSubmit()
    onSubmit(values) { //values object is the form data that was passed from handleSubmit, including title, category, content
    //Whenever this line of code is executed user will be redirected to a defined route
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props; //wired up reduxForm to PostsNew component, similar to connect(), reduxForm 
        //does the exact same thing, it adds a ton of additional props to our component PostNew, when we pull off
        //handleSubmit off of this.props, it was passed from reduxForm

        //handleSubmit handles the validation, then if everything looks good and is valid, then it takes a function as a call back that we defined 
        //and executes it only after everything is validated, it passes all the values from the form to our defined function to work it
        //either saving it to our database or whatever
        //this.submit is a callback function so we need to bind it to this component
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title" 
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}
//Field component, responsible for showing distinct field that is displayed to our users, specified the name property
//Specifies what piece of state this field will produce so in this case "title"
//Field doesn't know how to show itself on the screen, only holds the data
//component shows the JSX, how it'll appear on the screen

function validate(values) {
    //whenever user hits submit or enter key, validate will be called automatically for us
    //values provides an object with the properties title: 'adf', categories: '', content: '', values has all the value inputted from user
    //To validate this input, we have to return an object that we create from the validate function
    const errors = {};
    //Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title"; //Gets displayed to user
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    };
    if (!values.content) {
        errors.content  = "Enter some content";
    };
    //If we return an empty object, that means there is nothing wrong with the form submition,
    //If errors has any properties redux form assumes form is invalid
    return errors;
};

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm' //form property is the name of the form, if you have multiple forms you have multiple names
    //each form has a unique string name if you have multiple forms
})(
connect(null,{createPost})(PostsNew) //returns a container, allows createPost action creator to be on this.props for this component
);

//PRISTINE: User has not touched it yet
//TOUCHED: User has selected or focused an input and focused out of the input, user considers the field complete
//Invalid: Error message, show messages to user