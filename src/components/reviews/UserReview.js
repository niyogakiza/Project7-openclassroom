
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addReview } from '../../actions/index'




class UserReview extends Component{
    constructor(props){
        super(props);

        this.state = {
            text: '',
            rating: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(e){
        e.preventDefault();
        const { text, rating } = this.state;
        const { addReview, pid } = this.props;

        if(text && rating ){
            addReview(text, Number(rating), pid);
            this.setState({ text: '', rating: 3});
        }
    }

    handleChange(e){
        const value = e.target.value;
        const name = e.target.name;
        this.setState({ [name]: value });
    }

    render() {
        const {text, rating} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="col s12">
               Your Review: <input
                       name="text"
                       value={text}
                       type="text"
                       onChange={this.handleChange}
                       placeholder="Add your review"
                />

                <div className="input-field col s12">
                    Rating: <select
                    className="browser-default"
                    onChange={this.handleChange}
                    name="rating"
                    value={rating || ''}
                >
                    <option value={this.state.selected}>Choose your rating</option>
                    <option value="1">1 star</option>
                    <option value="2">2 star</option>
                    <option value="3">3 star</option>
                    <option value="4">4 star</option>
                    <option value="5">5 star</option>
                </select>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>

            </form>
        )
    }

}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
    addReview: addReview
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(UserReview);