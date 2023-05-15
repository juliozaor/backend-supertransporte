export interface PeticionTransaccionWompi {
    acceptance_token?: string;
    amount_in_cents?:  number;
    currency?:         string;
    customer_email?:   string;
    reference?:        string;
    customer_data?:    CustomerData;
    shipping_address?: ShippingAddress;
    payment_method?:   PaymentMethod;
}

export interface CustomerData {
    phone_number?:  string | null;
    full_name?:     string | null;
    legal_id?:      string | null;
    legal_id_type?: string | null;
}

export interface PaymentMethod {
    type?:                string;
    user_type?:           string;
    payment_description?: string;
    sandbox_status?:      string | null;
}

export interface ShippingAddress {
    address_line_1?: string | null;
    address_line_2?: string | null;
    country?:        string | null;
    region?:         string | null;
    city?:           string | null;
    name?:           string | null;
    phone_number?:   string | null;
    postal_code?:    string | null;
}
