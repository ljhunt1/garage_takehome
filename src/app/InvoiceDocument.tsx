import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export type InvoiceInfo = {
  listingTitle: string;
  listingDescription: string;
  sellingPrice: number;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  itemWeight: number;
};

// these might collide, oh well
const generateInvoiceNumber = (): string => {
  return Math.random().toString().substring(2, 12);
};

// Everything below this line was written by claude and edited by me
// Nothing else in this project was
// Could use some more validation
// The pdf could use some work esp around validation when some data points are missing
// -----------------------------------------------------------

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #666',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    width: 150,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
  },
  total: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    borderTop: '1px solid #666',
    paddingTop: 10,
  },
});

export const InvoicePdf = (props: { info: InvoiceInfo }) => {
  const { info } = props;
  const invoiceDate = new Date().toLocaleDateString();
  const invoiceNumber = generateInvoiceNumber();

  const taxRate = 0;
  const taxPrice = info.sellingPrice * taxRate;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>GARAGE INVOICE</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Invoice Number:</Text>
            <Text style={styles.infoValue}>{invoiceNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{invoiceDate}</Text>
          </View>
        </View>

        {/* Item Details */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Item Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Title:</Text>
            <Text style={styles.infoValue}>{info.listingTitle}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Description:</Text>
            <Text style={styles.infoValue}>{info.listingDescription}</Text>
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Specifications</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dimensions:</Text>
            <Text style={styles.infoValue}>
              {info.itemLength}L × {info.itemWidth}W × {info.itemHeight}H
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{info.itemWeight} lbs</Text>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Pricing</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Item Price:</Text>
            <Text style={styles.infoValue}>
              ${info.sellingPrice.toLocaleString()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tax (0%):</Text>
            <Text style={styles.infoValue}>${taxPrice.toLocaleString()}</Text>
          </View>
        </View>

        {/* Total */}
        <Text style={styles.total}>
          Total: ${(info.sellingPrice + taxPrice).toLocaleString()}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your purchase.</Text>
          <Text>
            For any questions, please contact our customer service department.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

