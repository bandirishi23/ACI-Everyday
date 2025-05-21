import hashlib
import hmac
from typing import cast

import aws_encryption_sdk  # type: ignore
import boto3  # type: ignore
from aws_cryptographic_material_providers.mpl import (  # type: ignore
    AwsCryptographicMaterialProviders,
)
from aws_cryptographic_material_providers.mpl.config import MaterialProvidersConfig  # type: ignore
from aws_cryptographic_material_providers.mpl.models import CreateAwsKmsKeyringInput  # type: ignore
from aws_cryptographic_material_providers.mpl.references import IKeyring  # type: ignore
from aws_encryption_sdk import CommitmentPolicy
import traceback
from aci.common import config

client = aws_encryption_sdk.EncryptionSDKClient(
    commitment_policy=CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

session = boto3.Session(
    region_name="us-east-1"
)

kms_client = session.client("kms")



resp = kms_client.encrypt(
    KeyId="arn:aws:kms:us-east-1:014864834261:key/34125671-6df4-426f-a095-60177b659067",
    Plaintext=b"hello"
)




mat_prov: AwsCryptographicMaterialProviders = AwsCryptographicMaterialProviders(
    config=MaterialProvidersConfig()
)

keyring_input: CreateAwsKmsKeyringInput = CreateAwsKmsKeyringInput(
    kms_key_id='arn:aws:kms:us-east-1:014864834261:key/34125671-6df4-426f-a095-60177b659067',
    kms_client=kms_client,
)

kms_keyring: IKeyring = mat_prov.create_aws_kms_keyring(input=keyring_input)


def encrypt(plain_data: bytes) -> bytes:
    # TODO: ignore encryptor_header for now
    try:
        my_ciphertext, _ = client.encrypt(source=plain_data, keyring=kms_keyring)
    except Exception as e:
        traceback.print_exc()
        raise RuntimeError(f"KMS encryption failed: {e}")
    return cast(bytes, my_ciphertext)


def decrypt(cipher_data: bytes) -> bytes:
    # TODO: ignore decryptor_header for now
    my_plaintext, _ = client.decrypt(source=cipher_data, keyring=kms_keyring)
    return cast(bytes, my_plaintext)


def hmac_sha256(message: str) -> str:
    return hmac.new(
        config.API_KEY_HASHING_SECRET.encode("utf-8"), message.encode("utf-8"), hashlib.sha256
    ).hexdigest()
