'use client';

import { getListing, toInvoiceInfo } from '@/(utils)/listingApiClient';
import { getUuidFromString } from '@/(utils)/uuidUtils';
import { generateAndEmailPdf } from '@/actions/actions';
import { InvoiceInfo, InvoicePdf } from '@/app/InvoiceDocument';
import { Alert, Button, TextField } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from 'react';

export default function Home() {
  // Keeping all state as useStates in the top-level component for now.
  // If this scaled we'd want something more sophisticated
  const [urlTextField, setUrlTextField] = useState<string>('');
  const [urlTextFieldError, setUrlTextFieldError] = useState<string>('');
  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfo | null>(null);
  const [emailSendFeedback, setEmailSendFeedback] = useState<{
    message: string;
    severity: 'error' | 'success';
  } | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3>Get PDF invoice for fire equipment listing</h3>
      <TextField
        id="outlined-controlled"
        label="Url of withgarage.com listing"
        value={urlTextField}
        onChange={(e) => {
          setUrlTextFieldError('');
          setUrlTextField(e.target.value);
        }}
        style={{ width: '500px' }}
      />
      <div>
        {/* Says "generate pdf" but actually just fetches listing info from
        the garage API and sets it in state */}
        <Button
          variant="contained"
          onClick={async () => {
            setInvoiceInfo(null);
            setUrlTextFieldError('');
            setEmailSendFeedback(null);

            const uuid = getUuidFromString(urlTextField);
            if (
              !urlTextField.startsWith('https://www.withgarage.com/listing/') ||
              uuid === null
            ) {
              setUrlTextFieldError(
                'Invalid URL, please point to a valid withgarage.com listing',
              );
              return;
            }

            let invoiceInfo: InvoiceInfo;
            try {
              const listing = await getListing(uuid);
              invoiceInfo = toInvoiceInfo(listing);
              setInvoiceInfo(invoiceInfo);
            } catch {
              setUrlTextFieldError('Unable to get listing from garage API');
              return;
            }
          }}
        >
          Generate PDF Invoice
        </Button>
        {urlTextFieldError && (
          <Alert severity="error">{urlTextFieldError}</Alert>
        )}
        {/* Download and email buttons, TODO style */}
        {invoiceInfo && (
          <>
            <PDFDownloadLink document={<InvoicePdf info={invoiceInfo} />}>
              Download invoice now!
            </PDFDownloadLink>
            <Button
              onClick={async () => {
                setEmailSendFeedback(null);
                try {
                  await generateAndEmailPdf(
                    invoiceInfo,
                    'hunt.liamjoseph@gmail.com',
                  );
                  setEmailSendFeedback({
                    severity: 'success',
                    message: 'Email sent!',
                  });
                } catch {
                  setEmailSendFeedback({
                    severity: 'error',
                    message: 'Error sending email',
                  });
                }
              }}
            >
              Send email
            </Button>
            {emailSendFeedback && (
              <Alert severity={emailSendFeedback.severity}>
                {emailSendFeedback.message}
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}

