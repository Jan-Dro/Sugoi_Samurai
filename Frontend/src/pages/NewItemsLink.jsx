import React from "react";
import { Link } from "react-router-dom";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import AboutUs from "./AboutUs";
import image from './images/IMG_5211 2.png'
import images from './images/car .png'


const NewItemsCard = () => {
    return (
        <>
        <div className="containers-cards">
      <div className="max-w-[900px] gap-4 grid grid-cols-12 grid-rows-2 px- 0">
        <div className="col-span-12 sm:col-span-6" >
          <Card className="h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New Items</p>
              <h4 className="text-white font-medium text-large">Explore the latest arrivals</h4>
            </CardHeader>
            <Link to="/newitems" className="card-link">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={image}
              />
            </Link>
            <CardFooter className="absolute bg-white/10 bottom-0 border-t-1 border-zinc-100/0 z-10">
              <Button className="text-tiny" color="default" radius="full" size="sm">
                Shop Now
              </Button>
            </CardFooter>
          </Card>
          </div>
            <div id="second"className="col-span-12 sm:col-span-4" >
          <Card className="h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">About us</p>
              <h4 className="text-white font-medium text-large">Learn about who we are</h4>
            </CardHeader>
            <Link to="/about-us" className="card-link">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={images}
              />
            </Link>
            <CardFooter className="absolute bg-white/10 bottom-0 border-t-1 border-zinc-100/0 z-10">
              <Button className="text-tiny" color="default" radius="full" size="sm">
                Shop Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      </div>
      </>
    );
  };
  
  export default NewItemsCard;