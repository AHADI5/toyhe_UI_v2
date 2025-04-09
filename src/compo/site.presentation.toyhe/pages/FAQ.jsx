import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ() {
  const faqs = [
    {
      question: "Comment fonctionne la plateforme TOYHE ?",
      answer: "TOYHE est une solution tout-en-un qui permet de gérer vos réservations, paiements et marketing en un seul endroit. Notre interface intuitive vous permet de gérer facilement votre activité de transport lacustre."
    },
    {
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons plusieurs moyens de paiement locaux et internationaux, notamment M-Pesa, Airtel Money, MaxiCash, ainsi que les cartes bancaires via nos partenaires bancaires."
    },
    {
      question: "Comment puis-je commencer à utiliser TOYHE ?",
      answer: "Commencez par demander une démonstration via notre formulaire en ligne. Notre équipe vous contactera pour vous guider dans la mise en place de votre compte et la configuration de vos services."
    }
  ];

  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h1" className="text-4xl font-bold text-center mb-12">
        Foire Aux Questions
      </Typography>
      
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <Accordion key={index} className="mb-4">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className="hover:bg-gray-50"
            >
              <Typography variant="h6" className="font-semibold">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
}

export default FAQ;