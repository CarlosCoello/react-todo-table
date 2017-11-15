import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component{

  constructor(props){
    super(props);
    this.contactFormSubmit = this.contactFormSubmit.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.state = {
      name: '',
      email: '',
      message: '',
      nameError: '',
      emailError: '',
      messageError: '',
      formGroup: 'form-group',
      hasNameF: '',
      hasNameE: '',
      hasNameS: '',
      hasEmailF: '',
      hasEmailE: '',
      hasEmailS: ''
    }
  }

  contactFormSubmit(e){
    e.preventDefault();
    this.setState({
      name: '',
      email: '',
      message: '',
      hasNameF: '',
      hasNameE: '',
      hasNameS: '',
      hasEmailF: '',
      hasEmailE: '',
      hasEmailS: ''
    })
  }

  nameChange(e){
    this.setState({
      name: e.target.value
    })
    if(this.state.name.length < 5){
      this.setState({
        nameError: 'Name must be at least 5 characters',
        hasNameE: 'has-error',
        hasNameF: 'has-feedback',
        hasNameS: ''
       });
    } else {
      this.setState({
        nameError: '',
        hasNameE: '',
        hasNameF: '',
        hasNameS: 'has-success'
      });
    }
  }

  emailChange(e){
    this.setState({
      email: e.target.value
    })
    if(this.state.email.length < 5 ){
      this.setState({
        emailError: 'Name must be at least 5 characters',
        hasEmailE: 'has-error',
        hasEmailF: 'has-feedback',
        hasEmailS: ''
       });
    } else if(this.state.email.indexOf('@') === -1) {
      this.setState({
        emailError: 'Email must contain the @ symbol',
       });
    }  else {
      this.setState({
        emailError: '',
        hasEmailE: '',
        hasEmailS: 'has-success'
      });
    }
  }

  messageChange(e){
    this.setState({
      message: e.target.value
    })
  }

  render(){
    return (
      <div className="contactWrapper">
        <header className="page-header">
          <h2>Send us a message!</h2>
        </header>
        <form onSubmit={this.contactFormSubmit}>
          <div className={ this.state.formGroup + ' ' + this.state.hasNameE + ' ' +  this.state.hasNameS + ' ' + this.state.hasNameF }>
            <label>Your Name</label>
            <input type="text" name="name" className="form-control" placeholder="Your name ..."
            value={this.state.name} onChange={this.nameChange}/>
            <small className="form-control-feedback">{this.state.nameError}</small>
          </div>
          <div className={ this.state.formGroup + ' ' + this.state.hasEmailE + ' ' + this.state.hasEmailS + ' ' + this.state.hasEmailF }>
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Your email ..."
            value={this.state.email} onChange={this.emailChange}/>
            <small className="form-control-feedback">{ this.state.emailError }</small>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea type="text" name="message" className="form-control" rows="4" cols="40" placeholder="Your message ..." value={this.state.message} onChange={this.messageChange}></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          <br/>
          <br/>
          <pre> name: { this.state.name } <br/> email: { this.state.email } <br/> message: { this.state.message }</pre>
        </form>
      </div>
    )
  }
}

export default Contact;
