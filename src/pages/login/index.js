import ImgFluid from "../../images/img-fluid.png";
import ImgFluidT from "../../images/img-fluid(T).png";
import ImgFluidM from "../../images/img-fluid(M).png";
import BtmImg from "../../images/btm-img-.png";
import Logo from "../../images/logo.png";
import "./login.css";

function Login(props) {
  return (
    <div className="login-container">
      <img className="logo" src={Logo} alt="" />
      <img className="img-fluid" src={ImgFluid} alt="" />
      <img className="img-fluidt" src={ImgFluidT} alt="" />
      <img className="img-fluidm" src={ImgFluidM} alt="" />
      <img className="btm-img" src={BtmImg} alt="" />
      <div className="sign-in">
        <div>
          <h2>
            Welcome Back to <br /> Skrate
          </h2>
          <button className="sign-in-btn" onClick={props.signIn}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
