import { generateSkillsDescription } from "@/ai/flows/skills-description-generator";
import { projects } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export async function Skills() {
  const allTech = [...new Set(projects.flatMap(p => p.tech))];
  
  let skillsList: string[] = [];
  try {
    const { description } = await generateSkillsDescription({ skills: allTech });
    skillsList = description.split(/\r?\n/).map(s => s.replace(/^- /, '')).filter(s => s.trim() !== '');
  } catch (error) {
    console.error("Failed to generate skills description:", error);
    // Fallback to the original tech list if AI fails
    skillsList = allTech;
  }

  return (
    <section id="skills" className="py-24 bg-muted/50">
        <div className="container mx-auto px-6 max-w-4xl">
             <div className="flex items-center justify-center gap-4 mb-12">
               <Cpu className="text-primary" />
               <h2 className="text-3xl font-light">Technical Proficiencies</h2>
             </div>
             <Card className="bg-background">
                <CardContent className="p-8">
                    <ul className="columns-2 md:columns-3 gap-x-8">
                        {skillsList.map((skill, index) => (
                            <li key={index} className="text-foreground/80 mb-2 text-sm break-inside-avoid">
                              - {skill.trim()}
                            </li>
                        ))}
                    </ul>
                </CardContent>
             </Card>
        </div>
    </section>
  );
}
