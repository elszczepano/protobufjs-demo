import protobuf from "protobufjs";

( async function () {
  const paymentReceivedEventPayload = {
    transactionId: "fd311f124a",
    priceInCents: 10000,
    receivedAt: Date.now(),
    gateway: "stripe"
  }

  const root = await protobuf.load( "events/PaymentReceivedEvent.proto" );
  const PaymentReceivedEvent = root.lookupType( "eventspackage.PaymentReceivedEvent" );

  const encodedPayload = PaymentReceivedEvent.encode( paymentReceivedEventPayload ).finish();

  const paymentEvent = PaymentReceivedEvent.decode( encodedPayload );

  console.log( "ENCODED PAYLOAD:", encodedPayload );
  console.log( "DECODED PAYLOAD:", paymentEvent );

  console.log( "SERIALIZED PROTOBUF SIZE:", encodedPayload.toString().length );
  console.log( "SERIALIZED JSON SIZE:", JSON.stringify( paymentReceivedEventPayload ).length );
} )();