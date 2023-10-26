import React from "react";
import Appbar from './NavBar'
import { Card, Divider, Image } from "@nextui-org/react";

export default function About(){

      return (
        <>
        <Appbar />
        <Card className="sugoi">
        <Image
        className="pika"
        src="https://www.icegif.com/wp-content/uploads/2022/01/icegif-1479.gif"
        alt="This is my image."
        width="300"
        height="200"
        />
          <h1>Hi thanks for stopping by</h1>
          <p>
            I'm Jesus and I pride on my artwork and inspiration. I get a huge
            amount of support from my wife Jessica and we love anime, With all good
            things we are starting this company back up again and hopefully able to
            satisfy each and everyone of you! Please give us a shout if you ever
            need anything and welcome to team Sugoi Samurai and stay amazing!
          </p>
          <Divider />
          <a href="mailto:sugoisamurai@outlook.com">Contact us: sugoisamurai@outlook.com</a>
        </Card>
        </>
      );
    };