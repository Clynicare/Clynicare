import { Stethoscope, User, Github, ArrowRight } from 'lucide-react';
import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  stethoscope: (props: IconProps) => <Stethoscope {...props} />,
  user: (props: IconProps) => <User {...props} />,
  gitHub: (props: IconProps) => <Github {...props} />,
  arrowRight: (props: IconProps) => <ArrowRight {...props} />,
};
