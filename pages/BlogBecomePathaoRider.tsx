import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Calendar, Clock, Zap, Bike, TrendingUp, Smartphone,
  Wallet, CheckCircle, MapPin, Phone, Mail, ShieldCheck, Wrench, FileText, AlertTriangle,
} from 'lucide-react';
import { useSEO, breadcrumbJsonLd } from '../utils/seo';

const URL = 'https://www.rydnepal.com/blog/how-to-become-pathao-rider-without-bike';

// Bilingual FAQ. English q/a feed the FAQPage schema (kept in sync with prerender.mjs);
// qNe/aNe render when the reader switches to Nepali.
const FAQ: { q: string; a: string; qNe: string; aNe: string }[] = [
  {
    q: 'Can I use a rented bike for Pathao in Nepal?',
    a: 'Yes. Pathao verifies the bike\'s bluebook and registration papers, not who owns it. RYD Nepal provides all the bike documents you need for Pathao registration, so a rented bike works exactly like an owned one.',
    qNe: 'के म नेपालमा भाडाको बाइकले पाठाओ चलाउन सक्छु?',
    aNe: 'सक्नुहुन्छ। पाठाओले बाइकको ब्लुबुक र दर्ता कागजात प्रमाणित गर्छ, बाइक कसको हो भनेर होइन। RYD Nepal ले पाठाओ दर्ताका लागि चाहिने सबै बाइक कागजात उपलब्ध गराउँछ, त्यसैले भाडाको बाइक आफ्नै बाइक जस्तै काम गर्छ।',
  },
  {
    q: 'How much is the Pathao onboarding fee in Nepal?',
    a: 'Around Rs. 2,500, paid once during registration. It is non-refundable, so make sure your license and bike documents are ready before you pay.',
    qNe: 'नेपालमा पाठाओ अनबोर्डिङ शुल्क कति हो?',
    aNe: 'करिब रु. २,५००, दर्ताका बेला एक पटक तिरिन्छ। यो फिर्ता नहुने शुल्क हो, त्यसैले तिर्नुअघि आफ्नो लाइसेन्स र बाइकका कागजात तयार छन् भनी पक्का गर्नुहोस्।',
  },
  {
    q: 'How long does Pathao verification take?',
    a: 'Pathao usually reviews your documents within about 24 hours. After approval, you complete a short in-app training module and quiz (you need around 80% to pass), then you can go online and start earning.',
    qNe: 'पाठाओ प्रमाणीकरणमा कति समय लाग्छ?',
    aNe: 'पाठाओले सामान्यतया करिब २४ घण्टाभित्र तपाईंका कागजात जाँच गर्छ। स्वीकृतिपछि, एपभित्रकै छोटो तालिम मोड्युल र क्विज पूरा गर्नुहुन्छ (पास हुन करिब ८०% चाहिन्छ), त्यसपछि अनलाइन गएर कमाउन सुरु गर्न सक्नुहुन्छ।',
  },
  {
    q: 'Do I need a professional driving license for Pathao?',
    a: 'No. A valid Nepali motorcycle license (category A) is enough for bike rides and deliveries. It can be professional or non-professional.',
    qNe: 'के पाठाओका लागि प्रोफेसनल लाइसेन्स चाहिन्छ?',
    aNe: 'चाहिँदैन। बाइक राइड र डेलिभरीका लागि मान्य नेपाली मोटरसाइकल लाइसेन्स (श्रेणी A) पर्याप्त छ। यो प्रोफेसनल वा नन-प्रोफेसनल जुनसुकै हुन सक्छ।',
  },
  {
    q: 'How much can a Pathao rider earn per day in Kathmandu?',
    a: 'Full-time riders in Kathmandu typically gross Rs. 1,500 to 2,500 per day from rides and deliveries. After Pathao\'s commission (around 20%), fuel, and Rs. 700/day bike rent, most active RYD Nepal riders net roughly Rs. 700 to 1,700 per day once incentives and quests are included.',
    qNe: 'काठमाडौंमा पाठाओ राइडरले दिनको कति कमाउन सक्छ?',
    aNe: 'काठमाडौंका पूर्णकालीन राइडरले राइड र डेलिभरीबाट सामान्यतया दिनको रु. १,५०० देखि २,५०० कुल कमाउँछन्। पाठाओको कमिसन (करिब २०%), इन्धन र रु. ७००/दिन बाइक भाडापछि, प्रोत्साहन र क्वेस्ट समेत जोड्दा धेरैजसो सक्रिय RYD Nepal राइडरले दिनको करिब रु. ७०० देखि १,७०० खुद कमाउँछन्।',
  },
  {
    q: 'What if the bike breaks down during a Pathao delivery?',
    a: 'RYD Nepal runs 24/7 breakdown and flat-tire assistance across Kathmandu Valley and dispatches a replacement bike within 30 minutes, so you can finish the delivery and keep earning instead of losing the day.',
    qNe: 'पाठाओ डेलिभरीका बेला बाइक बिग्रियो भने के हुन्छ?',
    aNe: 'RYD Nepal ले काठमाडौं उपत्यकाभरि २४/७ ब्रेकडाउन र फ्ल्याट-टायर सहायता चलाउँछ र ३० मिनेटभित्र रिप्लेसमेन्ट बाइक पठाउँछ, त्यसैले तपाईं दिन गुमाउनुको सट्टा डेलिभरी सकेर कमाइरहन सक्नुहुन्छ।',
  },
  {
    q: 'What documents do I need to rent a bike from RYD Nepal for Pathao?',
    a: 'Just your driving license and citizenship copy. There is no down payment, no bank loan, and no credit check, and you can collect the bike the same day from our Kapan office (Dhalane Pul).',
    qNe: 'पाठाओका लागि RYD Nepal बाट बाइक भाडामा लिन के-के कागजात चाहिन्छ?',
    aNe: 'तपाईंको सवारी चालक अनुमतिपत्र र नागरिकताको प्रतिलिपि मात्र। डाउन पेमेन्ट छैन, बैंक ऋण छैन, क्रेडिट चेक छैन, र उही दिन हाम्रो कपन कार्यालय (ढलाने पुल) बाट बाइक लिन सक्नुहुन्छ।',
  },
  {
    q: 'Will the rented bike ever become mine?',
    a: 'Yes. On the Pro Monthly rent-to-own plan (Rs. 7,000/week), the Hero Super Splendor 125cc becomes yours after 1.5 years of rental payments, with zero down payment.',
    qNe: 'के भाडाको बाइक कहिल्यै मेरो आफ्नै हुन्छ?',
    aNe: 'हुन्छ। प्रो मासिक भाडामा-लिएर-आफ्नो बनाउने योजनामा (रु. ७,०००/हप्ता), १.५ वर्षको भाडा भुक्तानीपछि हिरो सुपर स्प्लेन्डर 125cc तपाईंको आफ्नै हुन्छ, शून्य डाउन पेमेन्टमा।',
  },
];

const QUICK_FACTS: [string, string][] = [
  ['No bike needed to start, rent from Rs. 700/day', 'सुरु गर्न बाइक चाहिँदैन, दिनको रु. ७०० देखि भाडामा'],
  ['Pathao verification in about 24 hours', 'पाठाओ प्रमाणीकरण करिब २४ घण्टामा'],
  ['Onboarding fee around Rs. 2,500 (one time)', 'अनबोर्डिङ शुल्क करिब रु. २,५०० (एक पटक)'],
  ['Own the bike after 1.5 years, zero down payment', '१.५ वर्षपछि बाइक आफ्नै, शून्य डाउन पेमेन्ट'],
];

const REQUIREMENTS: [React.ComponentType<{ className?: string }>, React.ReactNode, React.ReactNode][] = [
  [FileText, <><strong>A valid Nepali driving license (category A).</strong> Professional or non-professional both work for bike rides and deliveries.</>, <><strong>मान्य नेपाली सवारी चालक अनुमतिपत्र (श्रेणी A)।</strong> बाइक राइड र डेलिभरीका लागि प्रोफेसनल वा नन-प्रोफेसनल दुवै चल्छ।</>],
  [FileText, <><strong>Nepali citizenship.</strong> A copy of your citizenship certificate is part of the identity check.</>, <><strong>नेपाली नागरिकता।</strong> तपाईंको नागरिकता प्रमाणपत्रको प्रतिलिपि पहिचान जाँचको हिस्सा हो।</>],
  [Smartphone, <><strong>A smartphone.</strong> You run everything through the Pathao Drive app, so an Android phone with data is essential.</>, <><strong>स्मार्टफोन।</strong> सबै काम पाठाओ ड्राइभ एपबाट हुन्छ, त्यसैले डाटा भएको एन्ड्रोइड फोन अनिवार्य छ।</>],
  [Bike, <><strong>A registered bike with a valid bluebook — own OR rented.</strong> This is the part most guides skip: Pathao verifies the bike's papers, not your ownership. A rented bike with proper documents works perfectly, and RYD Nepal provides those documents with every rental.</>, <><strong>मान्य ब्लुबुक भएको दर्ता गरिएको बाइक — आफ्नै वा भाडाको।</strong> धेरै गाइडले छुटाउने कुरा यही हो: पाठाओले बाइकको कागजात जाँच्छ, तपाईंको स्वामित्व होइन। सही कागजात भएको भाडाको बाइकले राम्ररी काम गर्छ, र RYD Nepal ले हरेक भाडासँगै ती कागजात दिन्छ।</>],
  [Wallet, <><strong>A one-time onboarding fee of around Rs. 2,500.</strong> It is non-refundable, so pay it only after your documents are ready.</>, <><strong>करिब रु. २,५०० को एक पटकको अनबोर्डिङ शुल्क।</strong> यो फिर्ता हुँदैन, त्यसैले कागजात तयार भएपछि मात्र तिर्नुहोस्।</>],
];

const STEPS: [string, React.ReactNode, string, React.ReactNode][] = [
  [
    'Get your driving license (category A)',
    <>If you already have a valid motorcycle license, skip ahead. If not, apply through the Department of Transport Management, pass the written and trial exams, and you are set. This is the only step that takes real time, everything after it can happen within a week.</>,
    'सवारी चालक अनुमतिपत्र (श्रेणी A) लिनुहोस्',
    <>यदि तपाईंसँग पहिले नै मान्य मोटरसाइकल लाइसेन्स छ भने, अगाडि बढ्नुहोस्। छैन भने, यातायात व्यवस्था विभागमार्फत आवेदन दिनुहोस्, लिखित र ट्रायल परीक्षा पास गर्नुहोस्। साँच्चै समय लाग्ने चरण यही मात्र हो, यसपछिका सबै काम एक हप्ताभित्र हुन सक्छ।</>,
  ],
  [
    'Rent a bike from RYD Nepal (same day)',
    <>Bring your <strong>license and citizenship copy</strong> to our Kapan office at Dhalane Pul, or apply via the <Link to="/contact" className="text-primary font-semibold hover:underline">contact page</Link>. No down payment, no credit check, no deposit hassle. You ride out the same day on a well-maintained Hero Super Splendor 125cc, and we hand you the bluebook and registration papers Pathao will ask for. Plans start at Rs. 700/day, see all options on our <Link to="/services" className="text-primary font-semibold hover:underline">services page</Link>.</>,
    'RYD Nepal बाट बाइक भाडामा लिनुहोस् (उही दिन)',
    <>आफ्नो <strong>लाइसेन्स र नागरिकताको प्रतिलिपि</strong> ढलाने पुलस्थित हाम्रो कपन कार्यालयमा ल्याउनुहोस्, वा <Link to="/contact" className="text-primary font-semibold hover:underline">सम्पर्क पेज</Link>बाट आवेदन दिनुहोस्। डाउन पेमेन्ट छैन, क्रेडिट चेक छैन, डिपोजिटको झन्झट छैन। उही दिन राम्ररी मर्मत गरिएको हिरो सुपर स्प्लेन्डर 125cc लिएर निस्कनुहुन्छ, र पाठाओले माग्ने ब्लुबुक र दर्ता कागजात हामी तपाईंलाई दिन्छौं। योजना दिनको रु. ७०० बाट सुरु हुन्छ, सबै विकल्प हाम्रो <Link to="/services" className="text-primary font-semibold hover:underline">सेवा पेज</Link>मा हेर्नुहोस्।</>,
  ],
  [
    'Register on the Pathao Drive app',
    <>Download the <strong>Pathao Drive</strong> app from the Play Store, choose Kathmandu as your city and bike as your vehicle, and sign up with your phone number. Upload your license, the bike's bluebook, and your photo. The whole registration is online, no office queue. During onboarding you pay the one-time fee of around Rs. 2,500.</>,
    'पाठाओ ड्राइभ एपमा दर्ता गर्नुहोस्',
    <>प्ले स्टोरबाट <strong>Pathao Drive</strong> एप डाउनलोड गर्नुहोस्, सहरमा काठमाडौं र सवारीमा बाइक छान्नुहोस्, र आफ्नो फोन नम्बरले साइन अप गर्नुहोस्। आफ्नो लाइसेन्स, बाइकको ब्लुबुक र फोटो अपलोड गर्नुहोस्। पूरै दर्ता अनलाइन हुन्छ, कार्यालयको लाइन बस्नु पर्दैन। अनबोर्डिङका बेला करिब रु. २,५०० को एक पटकको शुल्क तिर्नुहुन्छ।</>,
  ],
  [
    'Pass verification and the training module',
    <>Pathao reviews your documents, usually within about 24 hours. Once approved, a short in-app training module unlocks: watch the lessons on app usage, safety, and customer behaviour, then take the quiz. You need around 80% to pass, so do not rush it. Fail it and you simply retake it, but passing first time gets you on the road faster.</>,
    'प्रमाणीकरण र तालिम मोड्युल पास गर्नुहोस्',
    <>पाठाओले तपाईंका कागजात जाँच्छ, सामान्यतया करिब २४ घण्टाभित्र। स्वीकृत भएपछि एपभित्रै छोटो तालिम मोड्युल खुल्छ: एप प्रयोग, सुरक्षा र ग्राहक व्यवहारका पाठ हेर्नुहोस्, अनि क्विज दिनुहोस्। पास हुन करिब ८०% चाहिन्छ, त्यसैले हतार नगर्नुहोस्। फेल भए फेरि दिन पाइन्छ, तर पहिलो पटकमै पास भए छिटो सडकमा पुग्नुहुन्छ।</>,
  ],
  [
    'Go online and start earning',
    <>Tap online and take your first ride or food delivery. Peak hours (morning and evening office traffic, lunch and dinner for deliveries) pay best. Many riders also run InDrive, Yango, and Uber Bike on the same rented bike to keep the queue full all day.</>,
    'अनलाइन गएर कमाउन सुरु गर्नुहोस्',
    <>अनलाइन थिच्नुहोस् र पहिलो राइड वा फुड डेलिभरी लिनुहोस्। पिक समय (बिहान-बेलुकाको अफिस ट्राफिक, डेलिभरीका लागि खाजा-खानाको समय) मा सबैभन्दा राम्रो कमाइ हुन्छ। धेरै राइडरले दिनभर काम भरिभराउ राख्न उही भाडाको बाइकमा इनड्राइभ, यांगो र उबर बाइक पनि चलाउँछन्।</>,
  ],
];

const MATH_ROWS: [string, string, string, string][] = [
  // [item EN, amount EN, item NE, amount NE]
  ['Gross daily fares (rides + deliveries)', 'Rs. 1,500 to 2,500', 'दैनिक कुल भाडा (राइड + डेलिभरी)', 'रु. १,५०० देखि २,५००'],
  ['Pathao commission (around 20% on fares)', '− Rs. 300 to 500', 'पाठाओ कमिसन (भाडामा करिब २०%)', '− रु. ३०० देखि ५००'],
  ['Fuel, about 100 km/day (petrol around Rs. 202/litre)', '− Rs. 367', 'इन्धन, दिनको करिब १०० किमि (पेट्रोल करिब रु. २०२/लिटर)', '− रु. ३६७'],
  ['RYD Nepal bike rent (prepayment plan)', '− Rs. 700', 'RYD Nepal बाइक भाडा (प्रिपेमेन्ट योजना)', '− रु. ७००'],
];

const COMPARE_ROWS: [string, string, string, string, string, string][] = [
  // [aspect EN, rented EN, owned EN, aspect NE, rented NE, owned NE]
  ['Money needed to start', 'Rs. 0 down, rent from Rs. 700/day', 'Around Rs. 2,66,900 upfront, or a bank loan with down payment and EMIs', 'सुरु गर्न चाहिने पैसा', 'रु. ० डाउन, दिनको रु. ७०० देखि भाडा', 'करिब रु. २,६६,९०० एकमुष्ट, वा डाउन पेमेन्ट र EMI सहितको बैंक ऋण'],
  ['Maintenance & servicing', 'Free at our Kapan workshop, oil, brakes, tires included', 'Your own cost, roughly Rs. 2,000 to 3,000/month for a full-time rider', 'मर्मत र सर्भिसिङ', 'हाम्रो कपन वर्कशपमा निःशुल्क, मोबिल, ब्रेक, टायर समावेश', 'आफ्नै खर्च, पूर्णकालीन राइडरलाई महिनाको करिब रु. २,००० देखि ३,०००'],
  ['Breakdown mid-delivery', 'Replacement bike within 30 minutes, 24/7 across the Valley', 'Push it to a workshop, lose the day\'s earnings', 'डेलिभरीकै बीचमा ब्रेकडाउन', '३० मिनेटभित्र रिप्लेसमेन्ट बाइक, उपत्यकाभरि २४/७', 'वर्कशपसम्म धकेल्नुहोस्, दिनको कमाइ गुमाउनुहोस्'],
  ['Insurance', 'Insurance support, we handle the claims paperwork', 'You arrange and renew it yourself', 'बीमा', 'बीमा सहायता, दावीको कागजी प्रक्रिया हामी सम्हाल्छौं', 'आफैंले व्यवस्था र नवीकरण गर्नुपर्छ'],
  ['Documents for Pathao', 'Bluebook and registration papers provided with the rental', 'Your own bluebook, must stay renewed', 'पाठाओका लागि कागजात', 'भाडासँगै ब्लुबुक र दर्ता कागजात उपलब्ध', 'आफ्नै ब्लुबुक, नवीकरण भइरहनुपर्छ'],
  ['Ownership', 'Yours after 1.5 years on the Pro Monthly plan', 'Immediate, but only after years of saving or debt', 'स्वामित्व', 'प्रो मासिक योजनामा १.५ वर्षपछि आफ्नै', 'तुरुन्तै, तर वर्षौंको बचत वा ऋणपछि मात्र'],
];

const MISTAKES: [React.ReactNode, React.ReactNode][] = [
  [<><strong>Waiting to buy a bike first.</strong> Every month you spend saving is a month of Rs. 20,000+ in lost net earnings. Rent, earn, then own through rent-to-own.</>, <><strong>पहिले बाइक किन्न पर्खनु।</strong> बचत गर्दै बिताएको हरेक महिना रु. २०,०००+ खुद कमाइ गुमाएको महिना हो। भाडामा लिनुहोस्, कमाउनुहोस्, अनि भाडामा-लिएर-आफ्नो बनाउने योजनाबाट आफ्नै बनाउनुहोस्।</>],
  [<><strong>Paying the onboarding fee before documents are ready.</strong> The roughly Rs. 2,500 fee is non-refundable. Have your license, citizenship, and the bike's bluebook in hand first.</>, <><strong>कागजात तयार नहुँदै अनबोर्डिङ शुल्क तिर्नु।</strong> करिब रु. २,५०० को शुल्क फिर्ता हुँदैन। पहिले लाइसेन्स, नागरिकता र बाइकको ब्लुबुक हातमा राख्नुहोस्।</>],
  [<><strong>Riding for only one app.</strong> Pathao is the biggest, but InDrive, Yango, and Uber Bike fill the gaps between requests. Multi-apping on the same bike is how top riders hit the higher end of the earning range.</>, <><strong>एउटा मात्र एप चलाउनु।</strong> पाठाओ सबैभन्दा ठूलो हो, तर इनड्राइभ, यांगो र उबर बाइकले अनुरोधबीचको खाली समय भर्छन्। उही बाइकमा धेरै एप चलाउनु नै उत्कृष्ट राइडरहरू कमाइको माथिल्लो तहमा पुग्ने तरिका हो।</>],
  [<><strong>Skipping bike maintenance.</strong> A breakdown at 7 PM on a Friday is peak-hour income gone. With RYD Nepal, servicing is free and scheduled, and a replacement bike arrives within 30 minutes if anything fails.</>, <><strong>बाइकको मर्मत बेवास्ता गर्नु।</strong> शुक्रबार बेलुका ७ बजेको ब्रेकडाउन भनेको पिक-आवरको कमाइ सकिनु हो। RYD Nepal सँग सर्भिसिङ निःशुल्क र तालिकाबद्ध हुन्छ, र केही बिग्रिए ३० मिनेटभित्र रिप्लेसमेन्ट बाइक आइपुग्छ।</>],
  [<><strong>Treating the training quiz casually.</strong> You need around 80% to pass. Watch the modules properly once and you clear it the first time instead of losing days retaking it.</>, <><strong>तालिम क्विजलाई हल्का लिनु।</strong> पास हुन करिब ८०% चाहिन्छ। मोड्युल एक पटक राम्ररी हेर्नुहोस्, फेरि-फेरि दिँदै दिन गुमाउनुको सट्टा पहिलो पटकमै पास हुनुहुन्छ।</>],
];

const BlogBecomePathaoRider: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const en = lang === 'en';

  useSEO({
    title: en
      ? 'How to Become a Pathao Rider in Nepal Without Owning a Bike (2026 Guide) | RYD Nepal'
      : 'आफ्नै बाइक नभई नेपालमा पाठाओ राइडर कसरी बन्ने (२०२६ गाइड) | RYD Nepal',
    description: en
      ? 'Become a Pathao rider in Nepal without owning a bike. Rent from Rs. 700/day at RYD Nepal, register on the Pathao app in 24 hours, and earn Rs. 40,000 to 60,000/month.'
      : 'आफ्नै बाइक नभई नेपालमा पाठाओ राइडर बन्नुहोस्। RYD Nepal बाट दिनको रु. ७०० मा भाडामा लिनुहोस्, २४ घण्टामा पाठाओ एपमा दर्ता गर्नुहोस्, र महिनाको रु. ४०,००० देखि ६०,००० कमाउनुहोस्।',
    keywords:
      'how to become pathao rider in nepal, earn with pathao without bike, pathao rider registration, bike on rent for pathao, pathao rider requirements nepal, pathao onboarding fee, rent bike for pathao kathmandu, pathao rider salary nepal, pathao drive app registration, RYD Nepal',
    path: '/blog/how-to-become-pathao-rider-without-bike',
    ogType: 'article',
    ogTitle: 'No Bike? No Problem. Become a Pathao Rider in Nepal in Under a Week.',
    ogDescription:
      'The step everyone skips: you can register on Pathao with a rented bike. Rent from Rs. 700/day, get verified in 24 hours, net Rs. 700 to 1,700/day, and own the bike after 1.5 years.',
    ogImage: 'https://www.rydnepal.com/og/become-pathao-rider.jpg',
    datePublished: '2026-07-01',
    dateModified: '2026-07-01',
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', url: 'https://www.rydnepal.com/' },
        { name: 'Blog', url: 'https://www.rydnepal.com/blog' },
        { name: 'How to Become a Pathao Rider in Nepal Without Owning a Bike', url: URL },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'How to Become a Pathao Rider in Nepal Without Owning a Bike (2026 Guide)',
        description:
          'Complete 2026 guide to Pathao rider registration in Nepal for people who do not own a bike: requirements, the Pathao Drive app process, the onboarding fee, the daily earning math, and how a rented bike from Rs. 700/day gets you on the road the same week.',
        image: 'https://www.rydnepal.com/og/become-pathao-rider.jpg',
        mainEntityOfPage: URL,
        author: { '@type': 'Organization', name: 'RYD Nepal Pvt. Ltd.', url: 'https://www.rydnepal.com' },
        publisher: {
          '@type': 'Organization',
          name: 'RYD Nepal Pvt. Ltd.',
          url: 'https://www.rydnepal.com',
          logo: { '@type': 'ImageObject', url: 'https://www.rydnepal.com/logo.png' },
        },
        datePublished: '2026-07-01',
        dateModified: '2026-07-01',
        inLanguage: ['en', 'ne'],
        about: [
          { '@type': 'Thing', name: 'Pathao Rider Registration Nepal' },
          { '@type': 'Thing', name: 'Bike on Rent for Pathao' },
          { '@type': 'Thing', name: 'Earn with Pathao Without a Bike' },
          { '@type': 'Thing', name: 'Bike Rental Kathmandu' },
        ],
        mentions: [
          { '@type': 'SoftwareApplication', name: 'Pathao' },
          { '@type': 'SoftwareApplication', name: 'Pathao Drive' },
          { '@type': 'SoftwareApplication', name: 'InDrive' },
          { '@type': 'SoftwareApplication', name: 'Yango' },
          { '@type': 'SoftwareApplication', name: 'Uber' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {en ? 'Back to Blog' : 'ब्लगमा फर्कनुहोस्'}
          </Link>
          <div className="flex items-center space-x-2 text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-4 h-4" />
            <span>{en ? 'RYD Nepal Blog · Pathao Rider Guide' : 'RYD Nepal ब्लग · पाठाओ राइडर गाइड'}</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ne')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${!en ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
            >
              नेपाली
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6">
            {en ? (
              <>How to Become a Pathao Rider in Nepal <span className="text-primary">Without Owning a Bike</span> (2026 Guide)</>
            ) : (
              <><span className="text-primary">आफ्नै बाइक नभई</span> नेपालमा पाठाओ राइडर कसरी बन्ने (२०२६ गाइड)</>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
            {en
              ? 'Every guide to becoming a Pathao rider assumes you already own a bike. But for thousands of people in Kathmandu, that assumption is exactly the problem: the license is easy, the app is easy, the bike is the barrier. Here is the complete 2026 path from "no bike, no income" to earning on Pathao within a week, using a rented bike that costs less than one good day\'s earnings.'
              : 'पाठाओ राइडर बन्ने हरेक गाइडले तपाईंसँग पहिले नै बाइक छ भनेर मान्छ। तर काठमाडौंका हजारौं मानिसका लागि त्यही मान्यता नै समस्या हो: लाइसेन्स सजिलो छ, एप सजिलो छ, बाइक नै बाधा हो। "बाइक छैन, आम्दानी छैन" बाट एक हप्ताभित्र पाठाओमा कमाउनेसम्मको पूरा २०२६ बाटो यहाँ छ, एक राम्रो दिनको कमाइभन्दा कम पर्ने भाडाको बाइक प्रयोग गरेर।'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium">
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {en ? 'Published: July 1, 2026' : 'प्रकाशित: २०२६ जुलाई १'}
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {en ? '9 min read' : '९ मिनेट पठन'}
            </span>
            <span className="bg-primary/20 text-primary-200 px-3 py-1.5 rounded-full">{en ? 'Pathao & Gig Work' : 'पाठाओ र गिग काम'}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {en ? (
            <>Here is the fact that changes everything: <strong>Pathao does not require you to own the bike you ride.</strong> It requires a registered bike with valid papers. Whether those papers belong to a bike you bought or a bike you rented from{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">RYD Nepal for Rs. 700/day</Link>{' '}
              makes no difference to the app, to the passenger, or to your earnings. That single detail is the gap between you and Rs. 40,000 to 60,000 a month.</>
          ) : (
            <>सबै कुरा बदल्ने तथ्य यहाँ छ: <strong>पाठाओले तपाईंले चलाउने बाइक तपाईंकै हुनुपर्छ भन्दैन।</strong> यसलाई मान्य कागजात भएको दर्ता गरिएको बाइक चाहिन्छ। ती कागजात तपाईंले किनेको बाइकका हुन् वा{' '}
              <Link to="/services" className="text-primary font-semibold hover:underline">RYD Nepal बाट दिनको रु. ७०० मा भाडामा लिएको</Link>{' '}
              बाइकका, एप, यात्रु वा तपाईंको कमाइलाई कुनै फरक पर्दैन। त्यही एउटा कुरा नै तपाईं र महिनाको रु. ४०,००० देखि ६०,००० बीचको दूरी हो।</>
          )}
        </p>

        {/* Quick facts */}
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wide mb-3">{en ? 'Quick facts' : 'मुख्य कुराहरू'}</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
            {QUICK_FACTS.map(([eng, nep], i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{en ? eng : nep}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'What Pathao requires from riders in 2026' : '२०२६ मा पाठाओले राइडरबाट के माग्छ'}</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en
            ? 'Pathao registration in Nepal runs entirely through the Pathao Drive app, no office queues, no paper forms. To get approved as a bike rider, you need five things:'
            : 'नेपालमा पाठाओ दर्ता पूरै पाठाओ ड्राइभ एपबाट हुन्छ, कार्यालयको लाइन छैन, कागजका फारम छैनन्। बाइक राइडरका रूपमा स्वीकृत हुन तपाईंलाई पाँच कुरा चाहिन्छ:'}
        </p>
        <ul className="space-y-3 mb-6 text-slate-600">
          {REQUIREMENTS.map(([Icon, eng, nep], i) => (
            <li key={i} className="flex gap-3"><Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? eng : nep}</span></li>
          ))}
        </ul>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en
            ? 'Notice what is not on the list: a bike purchase receipt, a bank loan, or savings. If you can rent, you qualify. That is the loophole, except it is not a loophole at all, it is simply how the system works, and almost nobody writes about it.'
            : 'सूचीमा के छैन हेर्नुहोस्: बाइक किनेको रसिद, बैंक ऋण, वा बचत। भाडामा लिन सक्नुहुन्छ भने, तपाईं योग्य हुनुहुन्छ। यो कुनै छिद्र होइन, प्रणाली यसरी नै चल्छ, तर यसबारे लगभग कसैले लेख्दैन।'}
        </p>

        {/* Steps */}
        <h2 className="text-2xl font-black text-slate-900 mb-6">{en ? 'Step by step: from no bike to earning on Pathao' : 'चरणबद्ध: बाइक नभएकोबाट पाठाओमा कमाउनेसम्म'}</h2>
        <div className="space-y-4 mb-12">
          {STEPS.map(([te, de, tn, dn], i) => (
            <div key={i} className="flex gap-4 bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center">{i + 1}</div>
              <div>
                <p className="font-bold text-slate-900">{en ? te : tn}</p>
                <p className="text-slate-600 text-sm leading-relaxed mt-1">{en ? de : dn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The math */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'The math: Rs. 700/day rent vs what Pathao actually pays' : 'हिसाब: रु. ७००/दिन भाडा र पाठाओले वास्तवमा दिने कमाइ'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en
            ? 'The first question everyone asks: does it still make sense to pay rent every day? Let us run the honest numbers for a full-time rider in Kathmandu:'
            : 'सबैले सोध्ने पहिलो प्रश्न: हरेक दिन भाडा तिर्दा पनि फाइदा हुन्छ? काठमाडौंको पूर्णकालीन राइडरका लागि इमानदार हिसाब गरौं:'}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Daily item' : 'दैनिक विवरण'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Amount' : 'रकम'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {MATH_ROWS.map(([ie, ae, in_, an], i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-slate-900">{en ? ie : in_}</td>
                  <td className="p-4">{en ? ae : an}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
          <p className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" /> {en ? 'What lands in your pocket' : 'तपाईंको खल्तीमा के बस्छ'}</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>{en ? 'On fares alone, that leaves roughly Rs. 130 to 930 per day.' : 'भाडाबाट मात्रै, दिनको करिब रु. १३० देखि ९३० बाँकी रहन्छ।'}</li>
            <li>{en ? 'But fares are not the whole story: Pathao runs daily and weekly quests and bonuses, its tiered commission can drop well below 20% for high-volume riders, and food-delivery tips add up.' : 'तर भाडा मात्र पूरा कथा होइन: पाठाओले दैनिक र साप्ताहिक क्वेस्ट र बोनस चलाउँछ, धेरै राइड गर्नेका लागि यसको तहगत कमिसन २०% भन्दा निकै तल झर्न सक्छ, र फुड-डेलिभरीका टिप्स पनि थपिन्छन्।'}</li>
            <li>{en ? 'Riders who multi-app with InDrive, Yango, and Uber Bike on the same bike keep dead time near zero.' : 'उही बाइकमा इनड्राइभ, यांगो र उबर बाइक पनि चलाउने राइडरको खाली समय लगभग शून्य हुन्छ।'}</li>
            <li className="font-bold text-slate-900">{en ? 'Realistic net for active RYD Nepal riders: Rs. 700 to 1,700 per day, Rs. 40,000 to 60,000 gross per month.' : 'सक्रिय RYD Nepal राइडरको यथार्थ खुद कमाइ: दिनको रु. ७०० देखि १,७००, महिनाको कुल रु. ४०,००० देखि ६०,०००।'}</li>
          </ul>
        </div>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>And remember what the Rs. 700 covers: the bike itself, free servicing, insurance support, and 24/7 breakdown backup. An owner pays for all of that separately, on top of the Rs. 2,66,900 they spent to start. We broke down the full economics of renting for gig work in our guide to{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">Kathmandu's gig economy and bike rental</Link>.</>
          ) : (
            <>अनि रु. ७०० ले के-के समेट्छ सम्झनुहोस्: बाइक आफैं, निःशुल्क सर्भिसिङ, बीमा सहायता, र २४/७ ब्रेकडाउन ब्याकअप। बाइकधनीले यी सबै छुट्टाछुट्टै तिर्छन्, सुरुमै खर्चेको रु. २,६६,९०० माथि। गिग कामका लागि भाडाको पूरा अर्थशास्त्र हामीले{' '}
              <Link to="/blog/gig-economy-kathmandu-bike-rental" className="text-primary font-semibold hover:underline">काठमाडौंको गिग इकोनोमी र बाइक भाडा</Link> गाइडमा केलाएका छौं।</>
          )}
        </p>

        {/* Rented vs owned */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Rented vs owned bike for Pathao: the honest comparison' : 'पाठाओका लागि भाडाको बाइक कि आफ्नै: इमानदार तुलना'}</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          {en
            ? 'Owning a bike is a fine long-term goal. The question is whether it should come before or after you start earning. Side by side:'
            : 'बाइक हुनु राम्रो दीर्घकालीन लक्ष्य हो। प्रश्न के हो भने त्यो कमाइ सुरु गर्नुअघि आउनुपर्छ कि पछि। आमनेसामने:'}
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="text-left p-4 font-bold">{en ? 'Aspect' : 'पक्ष'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Rented from RYD Nepal' : 'RYD Nepal बाट भाडामा'}</th>
                <th className="text-left p-4 font-bold">{en ? 'Owned bike' : 'आफ्नै बाइक'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {COMPARE_ROWS.map(([ae, re, oe, an, rn, on], i) => (
                <tr key={i}>
                  <td className="p-4 font-semibold text-slate-900">{en ? ae : an}</td>
                  <td className="p-4">{en ? re : rn}</td>
                  <td className="p-4">{en ? oe : on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          {en ? (
            <>The breakdown row deserves special attention. For a Pathao rider, a bike in the workshop is not an inconvenience, it is a day of zero income while your rent, room, and food costs continue. RYD Nepal's <strong>30-minute replacement bike</strong> is the difference between losing a delivery and losing a day. No bike shop in Kathmandu offers this to owners.</>
          ) : (
            <>ब्रेकडाउनको लहरमा विशेष ध्यान दिनुहोस्। पाठाओ राइडरका लागि वर्कशपमा रहेको बाइक असुविधा मात्र होइन, त्यो शून्य आम्दानीको दिन हो, जबकि कोठा भाडा र खानाको खर्च चलिरहन्छ। RYD Nepal को <strong>३० मिनेटको रिप्लेसमेन्ट बाइक</strong> नै एउटा डेलिभरी गुमाउनु र पूरै दिन गुमाउनुबीचको फरक हो। काठमाडौंको कुनै बाइक पसलले बाइकधनीलाई यस्तो सुविधा दिँदैन।</>
          )}
        </p>
        <p className="text-slate-600 leading-relaxed mb-12">
          {en ? (
            <>And renting does not mean giving up on ownership. On the Pro Monthly plan (Rs. 7,000/week), the Hero Super Splendor 125cc becomes yours after 1.5 years, no down payment, no credit check, while it earns for you the entire time. We explain exactly how that works in our{' '}
              <Link to="/blog/rent-to-own-hero-splendor-125" className="text-primary font-semibold hover:underline">rent-to-own Hero Splendor guide</Link>.</>
          ) : (
            <>अनि भाडामा लिनु भनेको स्वामित्व त्याग्नु होइन। प्रो मासिक योजनामा (रु. ७,०००/हप्ता), हिरो सुपर स्प्लेन्डर 125cc १.५ वर्षपछि तपाईंको आफ्नै हुन्छ, डाउन पेमेन्ट छैन, क्रेडिट चेक छैन, र त्यो पूरै समय तपाईंका लागि कमाइरहन्छ। यो कसरी काम गर्छ भन्ने हामीले{' '}
              <Link to="/blog/rent-to-own-hero-splendor-125" className="text-primary font-semibold hover:underline">भाडामा-लिएर-आफ्नो बनाउने हिरो स्प्लेन्डर गाइड</Link>मा व्याख्या गरेका छौं।</>
          )}
        </p>

        {/* Common mistakes */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Five mistakes new Pathao riders make' : 'नयाँ पाठाओ राइडरले गर्ने पाँच गल्ती'}</h2>
        <ul className="space-y-3 mb-8 text-slate-600">
          {MISTAKES.map(([eng, nep], i) => (
            <li key={i} className="flex gap-3"><AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? eng : nep}</span></li>
          ))}
        </ul>
        <blockquote className="border-l-4 border-primary bg-slate-50 rounded-r-2xl p-6 mb-12 text-slate-700 italic">
          {en
            ? '“I waited eight months trying to save for a second-hand bike. Then I rented from RYD, registered on Pathao that same week, and earned more in my first month than I had saved in those eight. I should have started with the rental.”'
            : '“म सेकेन्ड-ह्यान्ड बाइकका लागि बचत गर्दै आठ महिना पर्खें। अनि RYD बाट भाडामा लिएँ, उही हप्ता पाठाओमा दर्ता गरें, र पहिलो महिनामै ती आठ महिनामा जम्मा गरेकोभन्दा बढी कमाएँ। मैले भाडाबाटै सुरु गर्नुपर्थ्यो।”'}
          <span className="block mt-2 not-italic text-sm font-semibold text-slate-500">{en ? 'Suman Tamang, Pathao rider, Kapan' : 'सुमन तामाङ, पाठाओ राइडर, कपन'}</span>
        </blockquote>

        {/* Why RYD */}
        <h2 className="text-2xl font-black text-slate-900 mb-4">{en ? 'Why RYD Nepal is built for Pathao riders' : 'किन RYD Nepal पाठाओ राइडरकै लागि बनेको हो'}</h2>
        <ul className="space-y-3 mb-12 text-slate-600">
          <li className="flex gap-3"><Bike className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Fuel-efficient Hero Super Splendor 125cc</strong>, around 55 km/l, the right bike for all-day delivery work in Valley traffic</> : <><strong>इन्धन-मितव्ययी हिरो सुपर स्प्लेन्डर 125cc</strong>, करिब ५५ किमि/लिटर, उपत्यकाको ट्राफिकमा दिनभरको डेलिभरी कामका लागि ठीक बाइक</>}</span></li>
          <li className="flex gap-3"><FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Pathao-ready documents</strong>, bluebook and registration papers handed over with the bike</> : <><strong>पाठाओ-तयार कागजात</strong>, बाइकसँगै ब्लुबुक र दर्ता कागजात हस्तान्तरण</>}</span></li>
          <li className="flex gap-3"><Wrench className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>Free maintenance</strong> at our Kapan workshop, oil, brakes, tires, all included in the rent</> : <><strong>निःशुल्क मर्मत</strong> हाम्रो कपन वर्कशपमा, मोबिल, ब्रेक, टायर, सबै भाडामै समावेश</>}</span></li>
          <li className="flex gap-3"><ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>24/7 breakdown support</strong> with a replacement bike within 30 minutes, anywhere in Kathmandu Valley</> : <><strong>२४/७ ब्रेकडाउन सहायता</strong>, काठमाडौं उपत्यका जहाँसुकै ३० मिनेटभित्र रिप्लेसमेन्ट बाइक</>}</span></li>
          <li className="flex gap-3"><TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span>{en ? <><strong>A real path to ownership</strong>, the bike is yours after 1.5 years on the Pro Monthly plan</> : <><strong>स्वामित्वको वास्तविक बाटो</strong>, प्रो मासिक योजनामा १.५ वर्षपछि बाइक तपाईंकै</>}</span></li>
        </ul>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-slate-900 mb-6">{en ? 'Frequently asked questions' : 'बारम्बार सोधिने प्रश्नहरू'}</h2>
        <div className="space-y-4 mb-12">
          {FAQ.map((item, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-slate-200 p-6 open:shadow-sm transition-all" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer items-center justify-between font-bold text-slate-900 list-none">
                <span>{en ? item.q : item.qNe}</span>
                <span className="ml-4 flex-shrink-0 text-primary transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{en ? item.a : item.aNe}</p>
            </details>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">{en ? 'The bike was the only thing missing. Not anymore.' : 'बाइक मात्र थिएन जो चाहिन्थ्यो। अब त्यो पनि छ।'}</h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            {en
              ? 'You now know the full path: license, rented bike, Pathao Drive app, 24-hour verification, training quiz, and you are earning. The riders making Rs. 40,000 to 60,000 a month on Pathao did not wait until they could afford a Rs. 2,66,900 bike. They started with what got them on the road fastest.'
              : 'अब तपाईंलाई पूरा बाटो थाहा छ: लाइसेन्स, भाडाको बाइक, पाठाओ ड्राइभ एप, २४ घण्टाको प्रमाणीकरण, तालिम क्विज, अनि तपाईं कमाउँदै हुनुहुन्छ। पाठाओमा महिनाको रु. ४०,००० देखि ६०,००० कमाउने राइडरहरू रु. २,६६,९०० को बाइक किन्न सक्ने नहुन्जेल पर्खेनन्। उनीहरूले जसरी छिटो सडकमा पुगिन्छ त्यसैबाट सुरु गरे।'}
          </p>
          <p className="text-white font-semibold mb-8">
            {en
              ? 'Rent a Pathao-ready Hero Super Splendor 125cc from RYD Nepal for Rs. 700/day, register on Pathao this week, and own the bike after 1.5 years.'
              : 'RYD Nepal बाट पाठाओ-तयार हिरो सुपर स्प्लेन्डर 125cc दिनको रु. ७०० मा भाडामा लिनुहोस्, यही हप्ता पाठाओमा दर्ता गर्नुहोस्, र १.५ वर्षपछि बाइक आफ्नो बनाउनुहोस्।'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-600 transition-all inline-flex items-center justify-center gap-2">
              {en ? 'Rent a Bike for Pathao' : 'पाठाओका लागि बाइक भाडामा लिनुहोस्'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center">
              {en ? 'See Rental Plans & Prices' : 'भाडा योजना र मूल्य हेर्नुहोस्'}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-left text-sm text-slate-300 max-w-xl mx-auto">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary flex-shrink-0" /> {en ? 'Dhalane Pul, Kapan, Kathmandu' : 'ढलाने पुल, कपन, काठमाडौं'}</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary flex-shrink-0" /> +977-9709197877</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary flex-shrink-0" /> support@rydnepal.com</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary flex-shrink-0" /> {en ? 'Sunday to Friday, 9 AM to 6 PM' : 'आइतबार देखि शुक्रबार, बिहान ९ देखि बेलुका ६ बजे'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogBecomePathaoRider;
