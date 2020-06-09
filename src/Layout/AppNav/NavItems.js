export const MainNav = [
	{
		icon: "pe-7s-home",
		label: "Home",
		to: "#/dashboards/crm",
	},
	{
		icon: "pe-7s-browser",
		label: "Pages",
		content: [
			{
				label: "Login",
				to: "#/pages/login",
			},
			{
				label: "Register",
				to: "#/pages/register",
			},
			{
				label: "Forgot Password",
				to: "#/pages/forgot-password",
			},
		],
	},
];
