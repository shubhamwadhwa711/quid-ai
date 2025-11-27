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
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchEnquiry } from "@/reducers/enquiry/enquirySlice";
import { useRouter } from "next/navigation";

const ConnectDrawer = ({ talentId, showConnectForm, setShowConnectForm }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [connectForm, setConnectForm] = useState({
    full_name: "",
    email: "",
    message: "",
    profile: talentId,
  });
  const dispatch = useAppDispatch();

  const { enquiry, loading, error } = useAppSelector((state) => state.Enquiry);
  const router = useRouter();
  // useEffect(() => {
  //   dispatch(fetchEnquiry());
  // }, [dispatch,id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setConnectForm({
      ...connectForm,
      [name]: value,
    });
  };

  const handleSubmitConnect = () => {
    // Here you would typically handle the form submission to your backend
    dispatch(fetchEnquiry(connectForm));
    console.log("Form submitted:", connectForm);
    // Show thank you message
    setFormSubmitted(true);

    // Optional: Reset form
    setConnectForm({ profile: "", full_name: "", email: "", message: "" });
  };

  const handleContinueSearching = () => {
    // Close the drawer
    setShowConnectForm(false);
    // Navigate to search page
    router.push("/search");
  };

  const handleClose = () => {
    // Close the drawer
    setShowConnectForm(false);
    // Navigate to search page
    // router.push("/search");
  };


  return (
    <Drawer
      open={showConnectForm}
      onOpenChange={(open) => {
        setShowConnectForm(open);
      }}
    >
      <DrawerContent className="bg-gradient-to-t max-w-md w-full rounded-t-3xl from-black via-blue-950 to-black border-white/20 text-white mx-auto left-0 right-0">
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
                      id="full_name"
                      name="full_name"
                      placeholder="Your Name"
                      value={connectForm.full_name}
                      onChange={handleFormChange}
                      className="bg-white/5 border-white/10 rounded-3xl focus:border-purple-500"
                      required
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
                    required
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
                    required
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
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="mt-2 rounded-3xl bg-transparent border-white/20 text-white"
                >
                  Cancel
                </Button>
              </DrawerClose>
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
              <Button
                onClick={handleContinueSearching}
                className="rounded-3xl px-8 py-3 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] w-full"
              >
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
