import Image from "next/image";
import Nav from '../components/Nav'
import Hero from "@/components/Hero";
import SecondPage from "@/components/SecondPage";
import './fontawesome';
import Thirdpage from "@/components/Thirdpage";
import Fourthpage from "@/components/Fourthpage";
export default function Home() {
  return (
   <>
    <Hero></Hero>
    <SecondPage></SecondPage>
    <Thirdpage></Thirdpage>
    <Fourthpage></Fourthpage>
   </>
   
  );
}
