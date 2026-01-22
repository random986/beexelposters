'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0a0e27] text-white font-sans">
            <Header />

            <main className="pt-32 pb-24 px-6 md:px-12 relative">
                <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f172a] to-[#1a1f3a] -z-10" />

                <div className="container mx-auto max-w-4xl bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 space-y-12">

                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-white/60">Last updated: December 2024</p>
                    </div>

                    <div className="space-y-12 text-white/80 leading-relaxed">

                        <p className="text-lg">
                            This Privacy Policy describes how Beexel Graphics ("we", "us", or "our") collects, uses, and protects your information when you use our Beexel Render Pro service.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                            <h3 className="text-xl font-semibold text-white/90">Personal Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Email address - for account creation and communication</li>
                                <li>Name - when provided in contact forms</li>
                                <li>Payment information - processed securely through third-party providers</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-white/90">Usage Information</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Images you upload - for processing and AI rendering</li>
                                <li>Generated images - and processing history</li>
                                <li>Service usage patterns - and preferences</li>
                                <li>Device information - and browser type</li>
                                <li>IP address - and location data</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide and improve our AI rendering services</li>
                                <li>To process your uploaded images and generate requested outputs</li>
                                <li>To communicate with you about your account and service updates</li>
                                <li>To process payments and manage billing</li>
                                <li>To provide customer support</li>
                                <li>To analyze usage patterns and improve our service quality</li>
                                <li>To ensure compliance with our terms of service</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">3. Image Processing and Storage</h2>
                            <h3 className="text-xl font-semibold text-white/90">Temporary Processing</h3>
                            <p>Your uploaded images are processed temporarily on our servers to generate the requested AI outputs. Images are not permanently stored unless you choose to save them.</p>

                            <h3 className="text-xl font-semibold text-white/90">Secure Processing</h3>
                            <p>All image processing is done in secure, encrypted environments. We use industry-standard security measures to protect your data during processing.</p>

                            <h3 className="text-xl font-semibold text-white/90">Data Retention</h3>
                            <p>We retain your images only as long as necessary to provide the service. You can request deletion of your data at any time.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">4. Information Sharing</h2>
                            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>With your explicit consent</li>
                                <li>To comply with legal obligations or court orders</li>
                                <li>To protect our rights, property, or safety</li>
                                <li>With trusted service providers who assist in operating our service (under strict confidentiality agreements)</li>
                                <li>In connection with a business transfer or acquisition</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
                            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and authentication systems</li>
                                <li>Secure data centers and infrastructure</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">6. Your Rights</h2>
                            <p>You have the following rights regarding your personal information:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Access</strong> - Request access to your personal information</li>
                                <li><strong>Correction</strong> - Request correction of inaccurate information</li>
                                <li><strong>Deletion</strong> - Request deletion of your personal information</li>
                                <li><strong>Portability</strong> - Request a copy of your data in a portable format</li>
                                <li><strong>Objection</strong> - Object to processing of your personal information</li>
                                <li><strong>Withdrawal</strong> - Withdraw consent for data processing</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">7. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our service. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">8. Third-Party Services</h2>
                            <p>
                                Our service may integrate with third-party services for payment processing, analytics, and other functions. These services have their own privacy policies, and we encourage you to review them.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">9. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during such transfers.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">10. Children's Privacy</h2>
                            <h2 className="text-2xl font-bold text-white">10. Children&apos;s Privacy</h2>
                            <p>
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">11. Changes to This Policy</h2>
                            <p>
                                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-white">12. Contact Us</h2>
                            <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                            <div className="bg-white/5 p-4 rounded-lg inline-block">
                                <p>Email: <a href="mailto:hello@beexelgraphics.com" className="text-cyan-400 hover:underline">hello@beexelgraphics.com</a></p>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
