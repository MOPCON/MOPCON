import classes from "./Card.module.css";
import { ReactComponent as FBlIcon } from "../../components/asset/Icon/fb-card.svg";
import { ReactComponent as SitelIcon } from "../../components/asset/Icon/site.svg";

const Card = (props) => {
  const isLegal = props.selectedTab === "legal";
  const isCommunity = props.selectedTab === "community";
  return (
    <section className={classes.container}>
      <div
        className={`${classes.team} 
        ${isLegal ? classes.legal : ""} 
        ${isCommunity ? classes.community : ""} ${
          props.team === "紀錄(攝影+直播)組" ? classes["team-position"] : ""
        }  ${
          props.team === "CocoaHeads Kaohsiung" ? classes["team-position"] : ""
        }`}
      >
        {props.team}
      </div>
      <div className={classes["content-container"]}>
        <div className={classes.content}>
          <p
            className={`${classes.title}  ${
              props.selectedTab !== "team" ? classes["title-none"] : ""
            }`}
          >
            #What？
          </p>
          <p className={classes.text}>{props.what}</p>
          <p
            className={`${classes.title}  ${
              props.selectedTab !== "team" ? classes["title-none"] : ""
            }`}
          >
            #Who？
          </p>
          <p className={classes.text}>{props.who}</p>
          <div className={`${classes["icon-container"]}`}>
            <a
              href={props.fb}
              target="blank"
              className={`
              ${props.selectedTab === "team" ? classes["icon-none"] : ""} 
              ${isLegal ? classes["legal-link"] : ""} 
              ${isCommunity ? classes["community-link"] : ""}
              ${props.fb === "" ? classes["icon-none"] : classes.fb} `}
            >
              <FBlIcon />
              Facebook
            </a>
            <a
              href={props.site}
              target="blank"
              className={`
              ${props.selectedTab === "team" ? classes["icon-none"] : ""}
              ${isLegal ? classes["legal-link"] : ""} 
              ${isCommunity ? classes["community-link"] : ""} 
              ${props.site === "" ? classes["icon-none"] : classes.site} `}
            >
              <SitelIcon />
              Site
            </a>
          </div>
        </div>
        <div
          className={`${classes["photo-container"]}  ${
            props.selectedTab === "team" ? "" : classes.bgc
          }`}
        >
          <img src={`${process.env.PUBLIC_URL}${props.Img}`} alt="img"></img>
        </div>
      </div>
    </section>
  );
};

export default Card;
