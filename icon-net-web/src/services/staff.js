import axios from "axios";
import config from "../config.json";
import Cookies from "js-cookie";

const login = async (Lang, user_name, password, ip_address, navigate) => {
  const url = `${config.rest_api_server_base_url}/api/data?call=ICONNET.dbo.icn_staff_login_s_1`;
  const postData = {
    "out.NVarChar@iRETURN_MSG": "",
    "out.NVarChar@iRETURN_CD": "",
    "in@iLANG": Lang,
    "in@iUSER_ID": user_name,
    "in@iUSER_PASS": password,
    "in@iPUBLISH_IP": ip_address,
  };



  try {
    const response = await axios.post(url, postData);

    const res = response.data;
    const value = res.output?.iRETURN_CD || "00";
    const msg = res.output?.iRETURN_MSG || "";

    console.log(`Response: [value:${value}, msg:${msg}]`);

    if (value === "00") {
      const store = {
        user_name,
        is_frist_login: false,
      };
     
      const jsonBytes = new TextEncoder().encode(JSON.stringify(store));
      const base64String = btoa(String.fromCharCode(...jsonBytes));

      Cookies.set("User", base64String, { path: "/" });
      Cookies.set("Lang", Lang, { path: "/" });
      Cookies.set("Pub_IP", ip_address, { path: "/" });

      navigate("/dashboard");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

export default { login };
