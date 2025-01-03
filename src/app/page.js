import Image from "next/image";
import Nav from '../components/Nav'
import Hero from "@/components/Hero";
import SecondPage from "@/components/SecondPage";
import './fontawesome';
export default function Home() {
  return (
   <>
    <Hero></Hero>
    <SecondPage></SecondPage>
   </>
   
  );
}
