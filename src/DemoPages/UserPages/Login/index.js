import React, { Fragment, Component } from "react";
import Slider from "react-slick";
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../../actions/authActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import validateInput from "../validations/login";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: {},
			isLoading: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props
				.login(this.state)
				.then((res) => this.props.history.push("/dashboards/crm"));
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors, email, password, isLoading } = this.state;

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
						<Col lg="4" className="d-none d-lg-block">
							<div className="slider-light">
								<Slider {...settings}>
									<div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
										<div
											className="slide-img-bg"
											style={{
												backgroundImage: "url(" + bg1 + ")",
											}}
										/>
										<div className="slider-content">
											<h3>Perfect Balance</h3>
											<p>
												ArchitectUI is like a dream. Some think it's too good to
												be true! Extensive collection of unified React Boostrap
												Components and Elements.
											</p>
										</div>
									</div>
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
									<div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
										<div
											className="slide-img-bg opacity-6"
											style={{
												backgroundImage: "url(" + bg2 + ")",
											}}
										/>
										<div className="slider-content">
											<h3>Complex, but lightweight</h3>
											<p>
												We've included a lot of components that cover almost all
												use cases for any type of application.
											</p>
										</div>
									</div>
								</Slider>
							</div>
						</Col>
						<Col
							lg="8"
							md="12"
							className="h-100 d-flex bg-white justify-content-center align-items-center"
						>
							<Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
								<div className="app-logo" />
								<h4 className="mb-0">
									<div>Welcome back,</div>
									<span>Please sign in to your account.</span>
								</h4>
								<h6 className="mt-3">
									No account?{" "}
									<a
										href="http://localhost:3000/architectui-react-pro#/pages/register"
										className="text-primary"
									>
										Sign up now
									</a>
								</h6>
								<Row className="divider" />
								<div>
									<Form onSubmit={this.onSubmit}>
										<Row form>
											<Col md={6}>
												<FormGroup>
													<Label for="exampleEmail">Email</Label>

													<TextFieldGroup
														field="email"
														label="Username / Email"
														value={email}
														onChange={this.onChange}
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup>
													<Label for="examplePassword">Password</Label>
													<TextFieldGroup
														field="password"
														label="Password"
														value={password}
														onChange={this.onChange}
														type="password"
													/>
												</FormGroup>
											</Col>
										</Row>
										<FormGroup check>
											<Input type="checkbox" name="check" id="exampleCheck" />
											<Label for="exampleCheck" check>
												Keep me logged in
											</Label>
										</FormGroup>
										<Row className="divider" />
										<div className="d-flex align-items-center">
											<div className="ml-auto">
												<a
													href="http://localhost:3000/architectui-react-pro#/pages/forgot-password"
													className="btn-lg btn btn-link"
												>
													Recover Password
												</a>{" "}
												<Button
													type="submit"
													color="primary"
													size="lg"
													disabled={isLoading}
												>
													Login to Dashboard
												</Button>
											</div>
										</div>
									</Form>
								</div>
							</Col>
						</Col>
					</Row>
				</div>
			</Fragment>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

Login.contextTypes = {
	router: PropTypes.object.isRequired,
};

export default withRouter(connect(null, { login })(Login));
