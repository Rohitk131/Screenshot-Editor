import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function AccordionDemo() {
    return (
      <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>What features does the screenshot editor offer?</AccordionTrigger>
      <AccordionContent>
        Our screenshot editor includes a range of features to enhance your images, such as plain backgrounds, gradient backgrounds, HD wallpapers, shadows, borders, device mockups, and 3D effects.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>How can I add shadows to my screenshots?</AccordionTrigger>
      <AccordionContent>
        You can easily add shadows by selecting the shadow option in the editor, adjusting the settings to your preference, and applying it to your screenshot for a more dynamic look.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Can I use device mockups with my screenshots?</AccordionTrigger>
      <AccordionContent>
        Yes! Our editor allows you to choose from a variety of device mockups, making it simple to showcase your screenshots in realistic settings.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-4">
      <AccordionTrigger>Is it possible to apply 3D effects to my images?</AccordionTrigger>
      <AccordionContent>
        Absolutely! You can apply 3D effects to your images by selecting the desired effect in the editor, enhancing the depth and visual appeal of your screenshots.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-5">
      <AccordionTrigger>Are there customizable options for backgrounds?</AccordionTrigger>
      <AccordionContent>
        Yes, you can choose from plain colors, gradients, or even upload your own wallpapers to create a unique background for your screenshots.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
    )
  }

  
