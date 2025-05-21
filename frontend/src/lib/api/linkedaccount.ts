import { LinkedAccount } from "@/lib/types/linkedaccount";

const LINKED_ACCOUNT_OWNER_ID = "aci-dev"; // ✅ Hardcoded owner ID

export async function getAllLinkedAccounts(apiKey: string): Promise<LinkedAccount[]> {
  const params = new URLSearchParams();
  params.append("linked_account_owner_id", LINKED_ACCOUNT_OWNER_ID);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch all linked accounts: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function getAppLinkedAccounts(
  appName: string,
  apiKey: string,
): Promise<LinkedAccount[]> {
  const params = new URLSearchParams();
  params.append("app_name", appName);
  params.append("linked_account_owner_id", LINKED_ACCOUNT_OWNER_ID);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch linked accounts: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function createAPILinkedAccount(
  appName: string,
  linkedAPIKey: string,
  apiKey: string,
): Promise<LinkedAccount> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts/api-key`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        app_name: appName,
        linked_account_owner_id: LINKED_ACCOUNT_OWNER_ID,
        api_key: linkedAPIKey,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create linked account: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function createNoAuthLinkedAccount(
  appName: string,
  apiKey: string,
): Promise<LinkedAccount> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts/no-auth`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        app_name: appName,
        linked_account_owner_id: LINKED_ACCOUNT_OWNER_ID,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create no auth linked account: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}

export async function getOauth2LinkURL(
  appName: string,
  apiKey: string,
  afterOAuth2LinkRedirectURL?: string,
): Promise<string> {
  const params = new URLSearchParams();
  params.append("app_name", appName);
  params.append("linked_account_owner_id", LINKED_ACCOUNT_OWNER_ID);
  if (afterOAuth2LinkRedirectURL) {
    params.append("after_oauth2_link_redirect_url", afterOAuth2LinkRedirectURL);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts/oauth2?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get OAuth2 link URL: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  if (!data.url || typeof data.url !== "string") {
    throw new Error("Invalid response: missing or invalid URL");
  }

  console.log("Generated ", afterOAuth2LinkRedirectURL);
  return data.url;
}

export async function deleteLinkedAccount(
  linkedAccountId: string, // ✅ this was missing
  apiKey: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts/${linkedAccountId}`,
    {
      method: "DELETE",
      headers: {
        "X-API-KEY": apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to delete linked account: ${response.status} ${response.statusText}`,
    );
  }
}

export async function updateLinkedAccount(
  linkedAccountId: string, // ✅ this was missing
  apiKey: string,
  enabled: boolean,
): Promise<LinkedAccount> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/linked-accounts/${linkedAccountId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        enabled,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update linked account: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
}