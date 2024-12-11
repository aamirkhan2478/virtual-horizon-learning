import React, { useState } from "react";
import { useSubmitContact } from "@/hooks/useSubmitContact";
import { useToast } from "@/Layouts/Dashboard/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/Layouts/Dashboard/components/ui/button";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const { mutate, isLoading } = useSubmitContact(onSuccess, onError); // React Query Mutation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData); // Submit data using React Query's mutate function
  };

  function onSuccess(data) {
    toast({
      variant: "default",
      title: "Success",
      description: data.message,
      className: "bg-green-500 text-white",
    });
    console.log(data); // Log data for debugging or additional handling

    setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
  }

  function onError(error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:
        error.response?.data?.message || "An unexpected error occurred.",
      className: "bg-red-500 text-white",
    });

    console.error(error); // Log error for debugging
  }

  return (
    <section className="contact py-12">
      <div className="px-8 grid grid-cols-2 gap-8 md1:grid-cols-1">
        {/* Google Map */}
        <div className="map-container w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22411.888833894733!2d74.356957!3d31.58016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b273d6ed0c1%3A0x4dcac84ea2200944!2sUniversity%20of%20Engineering%20and%20Technology%20(UET)%2C%20Lahore!5e1!3m2!1sen!2sbr!4v1733501348586!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="rounded-xl shadow-md h-full"
          />
        </div>

        {/* Contact Form */}
        <div className="form-container bg-gray-100 shadow-md p-8 rounded-xl flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-black mb-5">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Subject"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold shadow-md transition hover:bg-blue-600"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
