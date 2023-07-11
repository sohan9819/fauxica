import { toast } from 'react-hot-toast';

type Response = {
  razorpay_payment_id: string;
};

interface ExtendedWindow extends Window {
  Razorpay: any;
}

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const displayRazorpay = async (total: number) => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    alert('You are offline... Failed to load Razorpay SDK');
    return;
  }

  const options = {
    key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
    currency: 'INR',
    amount: total * 100,
    name: 'Fauxica',
    description: 'Thanks for purchasing',
    image:
      'https://github.com/sohan9819/fauxica/assets/64985447/080ee6fe-608c-4206-a256-97d3b574b29c',
    handler: function (response: Response) {
      alert(response.razorpay_payment_id);
      toast.success('Payment Successfully');
    },
    prefill: {
      name: 'Fauxica',
    },
  };

  const paymentObject = new (window as unknown as ExtendedWindow).Razorpay(
    options
  );
  paymentObject.open();
};
