import TonWeb from 'tonweb';

export const TonProvider = new TonWeb.HttpProvider(
    process.env.TON_PROVIDER_URL,
);
