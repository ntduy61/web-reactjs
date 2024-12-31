import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaffService from "../services/staff";
import util from '../utils/util';

const Login = () => {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState("vi");
  const [error, setError] = useState(null);
  const [welcomeMessage1, setWelcomeMessage1] = useState("");
  const [welcomeMessage2, setWelcomeMessage2] = useState("");
  const [welcomeMessage3, setWelcomeMessage3] = useState("");
  const [welcomeMessage4, setWelcomeMessage4] = useState("");
  const [welcomeMessage5, setWelcomeMessage5] = useState("");
  const navigate = useNavigate();
  const ip_address = "115.79.138.97";

  // Fetch welcome messages on component mount
  useEffect(() => {
    
    const fetchMessages = async () => {
        const dataXml = await util.getDataXml();
        const message1 = await util.getMessageFromXml(dataXml, "login_welcome1", lang);
        const message2 = await util.getMessageFromXml(dataXml, "login_welcome2", lang);
        const message3 = await util.getMessageFromXml(dataXml, "login_password", lang);
        const message4 = await util.getMessageFromXml(dataXml, "login", lang);
        const message5 = await util.getMessageFromXml(dataXml, "login_select_lang", lang);
        setWelcomeMessage1(message1);
        setWelcomeMessage2(message2);
        setWelcomeMessage3(message3);
        setWelcomeMessage4(message4);
        setWelcomeMessage5(message5);
    };

    fetchMessages();
  }, [lang]); // Rerun when lang changes

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await StaffService.login(lang, user_name, password, ip_address, navigate);
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc mật khẩu.");
      console.error(err);
    }
  };

  return (
    <div className="">
        <form onSubmit={handleLogin}>
            <div className="page-login">
                <div className="wrap-login">
                <div className="d-flex">
                    <div className="col-login-left">
                    <div className="bg-img-login"></div>
                    </div>
                    <div className="col-login-right">
                    <div className="content-login">
                        <div className="row">
                        <div className="col-4">
                            <div className="img-login-logo">
                            <img src="./assets/images/logo.png" alt="logo" />
                            </div>
                        </div>
                        <div className="col-8 text-end">
                            <div className="time-login"></div>
                        </div>
                        </div>

                        <div className="title-login">ICON-NET</div>
                        <div className="sub-title-login">
                        <div>{welcomeMessage1}</div>
                        <p>{welcomeMessage2}</p>
                        </div>

                        <div className="form-login">
                        <div className="d-flex">
                            {error && <p className="error">{error}</p>}
                        </div>

                        <div className="mb-4">
                            <input
                            type="text"
                            className="input-className form-control form-control-lg input-filed input-filed-login"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                            id="user_name"
                            placeholder="ID"
                            />
                        </div>

                        <div className="mb-4">
                            <input
                            type="password"
                            className="input-className form-control form-control-lg input-filed input-filed-login"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            placeholder={welcomeMessage3}
                            />
                        </div>

                        <div className="mb-4 mt-4">
                            <button
                            type="submit"
                            className="btn btn-primary btn-login btn-yellow"
                            >
                            {welcomeMessage4}
                            </button>
                        </div>

                        <div className="title-langugaue">
                            {welcomeMessage5}:
                        </div>
                        <div className="lang-content d-flex justify-content-center align-items-center">
                            <div className={`lang-item ${lang === "vi" ? "active" : ""}`} onClick={() => setLang("vi")} >
                                <img src="./assets/images/flag-vi.png" alt="Tiếng Việt" />
                                <span className="text-lang">Tiếng Việt</span>
                            </div>
                            <div className={`lang-item ${lang === "kr" ? "active" : ""}`} onClick={() => setLang("kr")}>
                                <img src="./assets/images/flag-kr.png" alt="한국어"/>
                                <span className="text-lang">한국어</span>
                            </div>
                            <div className={`lang-item ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>
                            <img src="./assets/images/flag-en.png"  alt="English"/>
                                <span className="text-lang">English</span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className="item-login-info"><img src="./assets/images/web.png" alt="web" /><a href="http://iconsys84.com" target="_blank"  rel="noopener noreferrer">www.iconsys84.com</a></div>
                            <div className="item-login-info"><img src="./assets/images/phone.png" alt="phone" /> 1800 7010 - 1800 7001</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </form>
    </div>
  );
};

export default Login;
