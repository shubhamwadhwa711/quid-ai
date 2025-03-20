import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, MoveRight } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

const ConnectDrawer = ({ showConnectForm, setShowConnectForm }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [connectForm, setConnectForm] = useState({
    name: "",
    email: "",
    message: "",
    project: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setConnectForm({
      ...connectForm,
      [name]: value,
    });
  };
  const handleSubmitConnect = () => {
    // Here you would typically handle the form submission to your backend
    console.log("Form submitted:", connectForm);

    // Show thank you message
    setFormSubmitted(true);

    // Optional: Reset form
    setConnectForm({ name: "", email: "", message: "", project: "" });
  };
  return (
    <Drawer open={showConnectForm} onOpenChange={setShowConnectForm}>
      <DrawerContent className=" bg-gradient-to-t rounded-t-3xl from-black  via-blue-950  to-black  border-white/20 text-white">
        {!formSubmitted ? (
          <div className="mx-4">
            <DrawerHeader>
              <DrawerTitle className="text-xl text-center font-semibold">
                Connect Now
              </DrawerTitle>
            </DrawerHeader>

            <div className="grid gap-4">
              <div className="grid gap-4">
                <div>
                  <div className="space-y-2">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={connectForm.name}
                      onChange={handleFormChange}
                      className="bg-white/5 border-white/10 rounded-3xl focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={connectForm.email}
                    onChange={handleFormChange}
                    className="bg-white/5 border-white/10 rounded-3xl focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Textarea
                    id="message"
                    name="message"
                    value={connectForm.message}
                    onChange={handleFormChange}
                    placeholder="Your Message"
                    className="bg-white/5 border-white/10 focus:border-purple-500 min-h-24"
                  />
                </div>
              </div>
            </div>

            <DrawerFooter className="flex justify-center mt-4">
              <Button
                onClick={handleSubmitConnect}
                className="rounded-3xl px-8 py-3 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] w-full"
              >
                Send Request <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </DrawerFooter>
          </div>
        ) : (
          // Thank you message after submission
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="relative flex justify-center items-center">
              <div className="h-16 w-16 flex justify-center items-center rounded-full bg-gradient-to-b from-[#7C2BD3] to-[#075AA8] relative z-10">
                <Check className="h-6 w-8 text-white" />
              </div>
              <div className="absolute h-24 w-24 rounded-full bg-[#7C2BD3]/30 z-0"></div>
              <div className="absolute h-32 w-32 rounded-full bg-[#7C2BD3]/20 z-[-1]"></div>
            </div>

            <DrawerTitle className="text-xl font-semibold mb-2 mt-14">
              Thank You!
            </DrawerTitle>
            <DrawerDescription className="text-white max-w-xs mx-auto">
              Your message has been sent successfully. <br />
              AI expert will get back to you soon.
            </DrawerDescription>
            <DrawerFooter className="mt-4">
              <Button className="rounded-3xl px-8 py-3 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] w-full">
                Continue Searching <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default ConnectDrawer;
