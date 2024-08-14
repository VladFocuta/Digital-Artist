import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Signup {
    @Prop({ unique: true, required: true })
    email: String;

    @Prop({ required: true })
    password: String;

    @Prop({ required: true })
    name: String;
}

export type SignupModel = Signup & Document;
export const SignupSchema = SchemaFactory.createForClass(Signup)
