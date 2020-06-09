import React, { Fragment, Component } from "react";
import Slider from "react-slick";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import map from "lodash/map";
import classnames from "classnames";
import validateInput from "../validations/signup";
import TextFieldGroup from "../common/TextFieldGroup";

import {
	userSignupRequest,
	isUserExists,
} from "../../../actions/signupActions";
import { addFlashMessage } from "../../../actions/flashMessages.js";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			errors: {},
			isLoading: false,
			invalid: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userSignupRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: "success",
						text: "You signed up successfully. Welcome!",
					});
					this.props.history.push("/pages/login");
				},
				(err) => this.setState({ errors: err.response.data, isLoading: false })
			);
		}
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	checkUserExists(e) {
		const field = e.target.name;
		const val = e.target.value;
		if (val !== "") {
			this.props.isUserExists(val).then((res) => {
				let errors = this.state.errors;
				let invalid;
				if (res.data.user) {
					errors[field] = "There is user with such " + field;
					invalid = true;
				} else {
					errors[field] = "";
					invalid = false;
				}
				this.setState({ errors, invalid });
			});
		}
	}
	render() {
		const { errors } = this.state;
		const { userSignupRequest, addFlashMessage, isUserExists } = this.props;
		let settings = {
			dots: true,
			infinite: true,
			speed: 500,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			initialSlide: 0,
			autoplay: true,
			adaptiveHeight: true,
		};
		return (
			<Fragment>
				<div className="h-100">
					<Row className="h-100 no-gutters">
						<Col
							lg="7"
							md="12"
							className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center"
						>
							<Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
								<div className="app-logo" />
								<h4>
									<div>Welcome,</div>
									<span>
										It only takes a{" "}
										<span className="text-success">few seconds</span> to create
										your account
									</span>
								</h4>
								<div>
									<form onSubmit={this.onSubmit}>
										<Row form>
											<Col md={6}>
												<FormGroup>
													<Label for="exampleEmail">
														<span className="text-danger">*</span> Username
													</Label>
													<TextFieldGroup
														error={errors.name}
														label="Username"
														onChange={this.onChange}
														checkUserExists={this.checkUserExists}
														value={this.state.username}
														field="name"
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<Label for="exampleName">Email</Label>
													<TextFieldGroup
														error={errors.email}
														label="Email"
														onChange={this.onChange}
														checkUserExists={this.checkUserExists}
														value={this.state.email}
														field="email"
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<Label for="examplePassword">
														<span className="text-danger">*</span> Password
													</Label>
													<TextFieldGroup
														error={errors.password}
														label="Password"
														onChange={this.onChange}
														value={this.state.password}
														field="password"
														type="password"
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<Label for="examplePasswordRep">
														<span className="text-danger">*</span> Repeat
														Password
													</Label>
													<TextFieldGroup
														error={errors.passwordConfirmation}
														label="Password Confirmation"
														onChange={this.onChange}
														value={this.state.passwordConfirmation}
														field="passwordConfirmation"
														type="password"
													/>
												</FormGroup>
											</Col>
										</Row>
										<FormGroup className="mt-3" check>
											<Input type="checkbox" name="check" id="exampleCheck" />
											<Label for="exampleCheck" check>
												Accept our{" "}
												<a
													href="https://colorlib.com/"
													onClick={(e) => e.preventDefault()}
												>
													Terms and Conditions
												</a>
												.
											</Label>
										</FormGroup>
										<div className="mt-4 d-flex align-items-center">
											<h5 className="mb-0">
												Already have an account?{" "}
												<a
													href="http://localhost:3000/architectui-react-pro#/pages/login"
													className="text-primary"
												>
													Sign in
												</a>
											</h5>
											<div className="ml-auto">
												<Button
													disabled={this.state.isLoading || this.state.invalid}
													color="primary"
													className="btn-wide btn-pill btn-shadow btn-hover-shine"
													size="lg"
												>
													Create Account
												</Button>
											</div>
										</div>
									</form>
								</div>
							</Col>
						</Col>
						<Col lg="5" className="d-lg-flex d-xs-none">
							<div className="slider-light">
								<Slider {...settings}>
									<div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
										<div
											className="slide-img-bg"
											style={{
												backgroundImage: "url(" + bg3 + ")",
											}}
										/>
										<div className="slider-content">
											<h3>Scalable, Modular, Consistent</h3>
											<p>
												Easily exclude the components you don't require.
												Lightweight, consistent Bootstrap based styles across
												all elements and components
											</p>
										</div>
									</div>
								</Slider>
							</div>
						</Col>
					</Row>
				</div>
			</Fragment>
		);
	}
}
Register.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	addFlashMessage: PropTypes.func.isRequired,
	isUserExists: PropTypes.func.isRequired,
};

Register.contextTypes = {
	router: PropTypes.object.isRequired,
};

export default withRouter(
	connect(null, { userSignupRequest, addFlashMessage, isUserExists })(Register)
);
