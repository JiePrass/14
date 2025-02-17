import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default function ContactForm() {
    // Fungsi untuk mengirim melalui Email
    const handleEmailSubmit = (event) => {
        event.preventDefault();
        const form = event.target.closest("form");
        const emailValue = form.email.value;
        const messageValue = form.message.value;

        // Ganti "your_email@gmail.com" dengan alamat email tujuan Anda
        window.location.href = `mailto:renjieprass@gmail.com?subject=Contact Form Submission&body=Email:%20${encodeURIComponent(
            emailValue
        )}%0A%0AMessage:%20${encodeURIComponent(messageValue)}`;
    };

    // Fungsi untuk mengirim melalui WhatsApp
    const handleWaSubmit = (event) => {
        event.preventDefault();
        const form = event.target.closest("form");
        const emailValue = form.email.value;
        const messageValue = form.message.value;

        // Ganti "YOUR_PHONE_NUMBER" dengan nomor WhatsApp Anda dalam format internasional, misalnya 6281234567890
        const phoneNumber = "6285773643862";
        const text = `Email : ${emailValue}\nPesan : ${messageValue}`;
        window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className="w-full py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 w-full">
                {/* Bagian Kiri */}
                <div className="md:col-span-5 rounded-lg">
                    <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-8">
                        Hubungi Kami Segera! Kami Siap Membantu anda
                    </h1>
                    <p className="text-sm md:text-xl text-gray-600">
                        Jika Anda memiliki pertanyaan atau butuh informasi lebih lanjut, tim kami siap memberikan bantuan <br /> dengan cepat dan ramah.
                    </p>
                </div>
                {/* Bagian Kanan: Formulir */}
                <div className="md:col-span-7 rounded-lg min-h-[400px]">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">
                                Email anda
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 border rounded-lg text-lg"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg text-gray-700 mb-2">
                                Pesan Anda
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="w-full p-3 border rounded-lg h-40 text-lg"
                                placeholder="Tuliskan Pesan Anda Disini"
                            ></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={handleEmailSubmit}
                                className="flex-1 flex items-center justify-center gap-2 bg-lime-500 text-white p-3 rounded-lg text-lg hover:bg-lime-600 transition"
                            >
                                <EnvelopeIcon className="w-6 h-6" />Email
                            </button>
                            <button
                                type="button"
                                onClick={handleWaSubmit}
                                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white p-3 rounded-lg text-lg hover:bg-green-700 transition"
                            >
                                <PhoneIcon className="w-6 h-6" />WhatsApp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
