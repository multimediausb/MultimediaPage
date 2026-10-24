const fs = require('fs');

function fix(file, map) {
  let c = fs.readFileSync(file, 'utf8');
  for (const [target, repl] of map) {
    c = c.replace(target, repl);
  }
  fs.writeFileSync(file, c, 'utf8');
}

fix('src/App.tsx', [
  ['import Navbar from "/"', 'import Navbar from "./components/ui/Navbar"']
]);

fix('src/components/sections/common/FeaturedProjectsSection.tsx', [
  ['import SectionHeader from "/"', 'import SectionHeader from "@/components/ui/SectionHeader"']
]);

fix('src/pages/Home.tsx', [
  ['import SectionHeader from "/"', 'import SectionHeader from "../components/ui/SectionHeader"'],
  ['import NewsCarousel from "/"', 'import NewsCarousel from "../components/ui/NewsCarousel"']
]);

fix('src/pages/Investigacion.tsx', [
  ['import SectionHeader from "/"', 'import SectionHeader from "../components/ui/SectionHeader"'],
  ['import ResearchCard from "/"', 'import ResearchCard from "../components/ui/ResearchCard"'],
  ['import PageBanner from "/"', 'import PageBanner from "../components/ui/PageBanner"']
]);

fix('src/pages/Miembros.tsx', [
  ['import SectionHeader from "/"', 'import SectionHeader from "../components/ui/SectionHeader"'],
  ['import MemberCard from "/"', 'import MemberCard from "../components/ui/MemberCard"'],
  ['import PageBanner from "/"', 'import PageBanner from "../components/ui/PageBanner"']
]);

fix('src/pages/Proyectos.tsx', [
  ['import PageBanner from "/"', 'import PageBanner from "../components/ui/PageBanner"'],
  ['import SectionHeader from "/"', 'import SectionHeader from "../components/ui/SectionHeader"']
]);

console.log('Fixed all imports cleanly');
