import { Stethoscope, User, Github, ArrowRight } from 'lucide-react';
import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  stethoscope: (props: IconProps) => <LucideStethoscope {...props} />,
  user: (props: IconProps) => <LucideUser {...props} />,
  gitHub: (props: IconProps) => <LucideGithub {...props} />,
  arrowRight: (props: IconProps) => <LucideArrowRight {...props} />,
};
