--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: allergens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allergens (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    food_item_id uuid,
    allergen character varying(255)
);


ALTER TABLE public.allergens OWNER TO postgres;

--
-- Name: carbohydrates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carbohydrates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    food_item_id uuid,
    total character varying(10) NOT NULL,
    dietary_fiber character varying(10) NOT NULL,
    sugars character varying(10) NOT NULL,
    added_sugars character varying(10) NOT NULL
);


ALTER TABLE public.carbohydrates OWNER TO postgres;

--
-- Name: food_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    item_name character varying(255) NOT NULL,
    brand character varying(255),
    serving_size character varying(50) NOT NULL,
    calories integer NOT NULL,
    total_fat character varying(10) NOT NULL,
    saturated_fat character varying(10) NOT NULL,
    trans_fat character varying(10) NOT NULL,
    cholesterol character varying(10) NOT NULL,
    sodium character varying(10) NOT NULL,
    protein character varying(10) NOT NULL
);


ALTER TABLE public.food_items OWNER TO postgres;

--
-- Name: vitamins_and_minerals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vitamins_and_minerals (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    food_item_id uuid,
    vitamin_a character varying(10) NOT NULL,
    vitamin_c character varying(10) NOT NULL,
    calcium character varying(10) NOT NULL,
    iron character varying(10) NOT NULL
);


ALTER TABLE public.vitamins_and_minerals OWNER TO postgres;

--
-- Data for Name: allergens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.allergens (id, food_item_id, allergen) FROM stdin;
c505052a-5600-4026-8221-1ad0298fba53	71199b96-b61a-41b7-8e1b-ba6b45cec8ee	\N
f4792799-08fd-4ba8-8b8a-89068ace81a7	28f1a1d3-1a3d-4bd6-a0dd-ac4ace84393b	\N
07512b47-f4c1-469e-8195-6aba70158505	492d4d02-dd5a-4051-a097-eb7017366141	\N
1e0b0305-55b3-4e88-8903-e3f8de41a908	8968fe2b-b759-4bb1-b2b4-89685e709e28	\N
5ffc7e2a-9e99-4e7a-8fa2-ca63003192fe	1cc86219-3e6c-4596-9b9b-6b2fc5dd3ea3	\N
44866f3f-5f30-4998-a19d-f666b7be09cb	5a156c67-0a1e-4204-8a0b-e6c5cd57fa89	\N
5ecfb6e6-7b4b-4306-906e-7e6307512744	c599c6dc-77b6-4ed8-88f5-bf772664a8cc	\N
6ef4fd08-d1af-4ea3-bdb0-4b406918fb56	b6e28e29-951e-43be-95b4-f947c4f090d0	\N
c547b102-7183-4437-9a0a-9e9515b61a47	8079da7f-a2dc-40c9-9225-27c962e93f99	\N
6d57952b-2dad-460a-8d66-9ed84a64f371	1aa7aee0-450e-438b-a378-42939341b126	\N
80ab8e74-49b0-4bb1-a8b8-c676ca528b30	9b38b541-933a-4e48-b274-b4c165db3aa9	\N
c6fd719c-2b38-4cc8-a9f1-7bbc8142cf17	f873b7cd-68d0-4b6d-8237-9ab7c07c8138	\N
786d589d-b20e-4726-8674-b01e7cada923	8abad0f0-cb4b-4f9d-a1ae-93d2ad7e8be5	\N
8d3e16c8-30a0-44b7-a405-85cbc5f819f6	65c4c373-623b-406c-a0f5-9a840a4e3d0d	\N
961b6ac7-5998-47ca-ab44-95720720c059	83327b3b-5b7a-453d-8f60-9511e9757403	\N
c565a61b-848e-4660-88d7-a1296b8d4aa0	a9fdfda4-dada-4641-9402-67c12dc8142f	almonds
1304c339-d6cf-482d-ac7d-04b26eca05c4	9461dfce-435e-4215-8f33-7201217aebda	peanuts
e2356dbe-6c79-4dee-9d32-34f896374768	ef90a098-fa35-4b0a-be56-0edb11aaa593	milk
f16630f3-a84b-44b7-9dc7-47e22ec11e88	2bd76372-017c-466e-89b0-13a96ad159ad	\N
97bfe537-7710-4223-9885-d2cc9e2c6211	ddd9f6d6-8331-4270-9be6-2010cf1536cc	milk
\.


--
-- Data for Name: carbohydrates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carbohydrates (id, food_item_id, total, dietary_fiber, sugars, added_sugars) FROM stdin;
09244485-4d04-4214-9fe8-ea35e56dde63	71199b96-b61a-41b7-8e1b-ba6b45cec8ee	14g	2.4g	10g	0g
08d71b76-b066-45a6-916a-b4597fabb1b4	28f1a1d3-1a3d-4bd6-a0dd-ac4ace84393b	23g	2.6g	12g	5g
8379e98f-9751-4e48-8d93-a25175a8b2fe	492d4d02-dd5a-4051-a097-eb7017366141	12g	2.4g	9g	0g
a0598aa0-8b17-4294-83ce-def355b6d56c	8968fe2b-b759-4bb1-b2b4-89685e709e28	7.7g	2.0g	4.9g	0g
abf14aef-3335-4f6b-aa03-38a7c53afee2	1cc86219-3e6c-4596-9b9b-6b2fc5dd3ea3	14.5g	2.4g	10g	0g
b68f7d38-993b-4f33-9340-6047e3548cbb	5a156c67-0a1e-4204-8a0b-e6c5cd57fa89	18g	0.9g	16g	0g
671df6ea-e13a-4136-adc3-578067b2c785	c599c6dc-77b6-4ed8-88f5-bf772664a8cc	15g	3g	9g	0g
ab9cd8cf-323c-4e1b-8ced-7f935036d9e0	b6e28e29-951e-43be-95b4-f947c4f090d0	13g	1.4g	10g	0g
76896310-6f0f-4b67-9e4d-680ec5809cb9	8079da7f-a2dc-40c9-9225-27c962e93f99	15g	1.6g	14g	0g
7cc5aff7-a0eb-45db-aa13-318ac208eb38	1aa7aee0-450e-438b-a378-42939341b126	10g	1.5g	8g	0g
5af9eefc-7e6f-4405-80cd-676163abdef7	9b38b541-933a-4e48-b274-b4c165db3aa9	10g	2.8g	5g	0g
13e5ece1-304b-407a-9181-b201cbb5126b	f873b7cd-68d0-4b6d-8237-9ab7c07c8138	3.6g	2.2g	0.4g	0g
ce31ca66-11fa-4f5b-80a2-e389235a3da6	8abad0f0-cb4b-4f9d-a1ae-93d2ad7e8be5	11g	3.8g	1.7g	0g
ae40a52c-154d-4cd0-b0c9-cc6526853f9a	65c4c373-623b-406c-a0f5-9a840a4e3d0d	17g	2.2g	0.8g	0g
07640e7e-969f-4500-8c38-b0c340a2cfe1	83327b3b-5b7a-453d-8f60-9511e9757403	21g	2.8g	0.9g	0g
a9beeed5-2d9b-4b7c-b6e5-ce4b90656cc8	a9fdfda4-dada-4641-9402-67c12dc8142f	6g	3.5g	1g	0g
2da9389c-d639-4aa7-9bb1-625b5c16d904	9461dfce-435e-4215-8f33-7201217aebda	29g	3g	10g	8g
85900c96-6bdb-4257-9080-777810910055	ef90a098-fa35-4b0a-be56-0edb11aaa593	24g	1g	18g	16g
8f7b8310-eecc-43c9-98c9-fd1466eb2112	2bd76372-017c-466e-89b0-13a96ad159ad	1g	0g	0g	0%
e648c940-4b6b-415c-b64f-ec155de8d49d	ddd9f6d6-8331-4270-9be6-2010cf1536cc	15g	0g	15g	0g
\.


--
-- Data for Name: food_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food_items (id, item_name, brand, serving_size, calories, total_fat, saturated_fat, trans_fat, cholesterol, sodium, protein) FROM stdin;
71199b96-b61a-41b7-8e1b-ba6b45cec8ee	Apple	\N	100g	52	0.2g	0g	0g	0mg	1mg	0.3g
28f1a1d3-1a3d-4bd6-a0dd-ac4ace84393b	Banana	\N	100g	89	0.3g	0.1g	0g	0mg	1mg	1.1g
492d4d02-dd5a-4051-a097-eb7017366141	Orange	\N	100g	47	0.1g	0g	0g	0mg	1mg	0.9g
8968fe2b-b759-4bb1-b2b4-89685e709e28	Strawberries	\N	100g	32	0.3g	0g	0g	0mg	1mg	0.7g
1cc86219-3e6c-4596-9b9b-6b2fc5dd3ea3	Blueberries	\N	100g	57	0.3g	0g	0g	0mg	1mg	0.7g
5a156c67-0a1e-4204-8a0b-e6c5cd57fa89	Grapes	\N	100g	69	0.2g	0g	0g	0mg	1mg	0.6g
c599c6dc-77b6-4ed8-88f5-bf772664a8cc	Kiwi	\N	100g	61	0.5g	0.1g	0g	0mg	3mg	1.1g
b6e28e29-951e-43be-95b4-f947c4f090d0	Pineapple	\N	100g	50	0.1g	0g	0g	0mg	1mg	0.5g
8079da7f-a2dc-40c9-9225-27c962e93f99	Mango	\N	100g	60	0.4g	0.1g	0g	0mg	1mg	0.8g
1aa7aee0-450e-438b-a378-42939341b126	Peach	\N	100g	39	0.3g	0g	0g	0mg	0mg	0.9g
9b38b541-933a-4e48-b274-b4c165db3aa9	Carrot	\N	100g	41	0.2g	0g	0g	0mg	69mg	0.9g
f873b7cd-68d0-4b6d-8237-9ab7c07c8138	Spinach	\N	100g	23	0.4g	0g	0g	0mg	24mg	2.9g
8abad0f0-cb4b-4f9d-a1ae-93d2ad7e8be5	Broccoli	\N	100g	55	0.6g	0.1g	0g	0mg	33mg	4.2g
65c4c373-623b-406c-a0f5-9a840a4e3d0d	Potato	\N	100g	77	0.1g	0g	0g	0mg	6mg	2g
83327b3b-5b7a-453d-8f60-9511e9757403	Quinoa	\N	100g	120	1.9g	0.2g	0g	0mg	5mg	4.1g
a9fdfda4-dada-4641-9402-67c12dc8142f	Almonds	Blue Diamond	28g	164	14g	1g	0g	0mg	1mg	6g
9461dfce-435e-4215-8f33-7201217aebda	Granola Bar	Healthy Snacks Co.	40g	190	7g	1g	0g	0mg	95mg	5g
ef90a098-fa35-4b0a-be56-0edb11aaa593	Chocolate Bar	Ghirardelli	40g	200	12g	7g	0g	5mg	15mg	2g
2bd76372-017c-466e-89b0-13a96ad159ad	Cheddar Cheese	\N	28g	113	9g	6g	0g	28mg	174mg	7g
ddd9f6d6-8331-4270-9be6-2010cf1536cc	Yogurt	\N	150g	100	4g	2g	0g	10mg	60mg	5g
\.


--
-- Data for Name: vitamins_and_minerals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vitamins_and_minerals (id, food_item_id, vitamin_a, vitamin_c, calcium, iron) FROM stdin;
8fe9bdc0-06ac-4a1c-8feb-ea4fff3b3915	71199b96-b61a-41b7-8e1b-ba6b45cec8ee	1%	7%	1%	1%
76954700-d7e5-4c80-886c-43d0659681bc	28f1a1d3-1a3d-4bd6-a0dd-ac4ace84393b	0%	10%	1%	2%
7087b4ed-d222-4ab7-9e66-ed100395cdda	492d4d02-dd5a-4051-a097-eb7017366141	2%	90%	4%	1%
b463b3d4-88e8-435b-a7bc-a08550ae7ff3	8968fe2b-b759-4bb1-b2b4-89685e709e28	1%	58%	1%	1%
274dd55f-e9a3-4084-add7-b0069121b585	1cc86219-3e6c-4596-9b9b-6b2fc5dd3ea3	1%	9%	1%	1%
814af55c-f46a-40aa-b65a-294c316f7854	5a156c67-0a1e-4204-8a0b-e6c5cd57fa89	1%	18%	1%	1%
e80dfbf5-cffe-4057-9b87-9853196afd5b	c599c6dc-77b6-4ed8-88f5-bf772664a8cc	1%	71%	3%	1%
6de8a519-b82d-4fcd-9b5c-adc3df1345ef	b6e28e29-951e-43be-95b4-f947c4f090d0	1%	80%	1%	1%
0bdc042d-7b28-435d-83b5-1daa6d6c36b9	8079da7f-a2dc-40c9-9225-27c962e93f99	1%	60%	2%	1%
cac2f8b9-9b3a-4f08-a77a-7a55693786d0	1aa7aee0-450e-438b-a378-42939341b126	1%	6%	1%	1%
d1fb198c-96a5-4818-b719-e0c71a602bb3	9b38b541-933a-4e48-b274-b4c165db3aa9	3%	6%	3%	1%
fc134a89-0ec5-4436-8a44-82af5a3fbcab	f873b7cd-68d0-4b6d-8237-9ab7c07c8138	56%	47%	99%	15%
4908ac89-b51c-4143-9d11-837af7c4be6a	8abad0f0-cb4b-4f9d-a1ae-93d2ad7e8be5	11%	90%	47%	2%
54e54ccb-1fe7-475a-8696-ccfeb7f9591b	65c4c373-623b-406c-a0f5-9a840a4e3d0d	0%	5%	1%	4%
4274d02e-2496-41c2-8632-c8576fa0cda0	83327b3b-5b7a-453d-8f60-9511e9757403	0%	0%	1%	15%
50c4b317-0e3e-4778-b156-bb193631381a	a9fdfda4-dada-4641-9402-67c12dc8142f	0%	0%	7%	6%
192d9d4a-e1c6-4866-920a-b834d89d94f0	9461dfce-435e-4215-8f33-7201217aebda	0%	2%	4%	6%
b0bfa93f-169a-4ed5-958a-8d4626b61583	ef90a098-fa35-4b0a-be56-0edb11aaa593	0%	0%	2%	8%
03e443e5-77cd-4aaa-9375-86cbf83eb6ad	2bd76372-017c-466e-89b0-13a96ad159ad	0%	20%	0%	milk
251ce8bd-7f52-4ed0-b825-d06ad52cf41e	ddd9f6d6-8331-4270-9be6-2010cf1536cc	0%	0%	15%	1%
\.


--
-- Name: allergens allergens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergens
    ADD CONSTRAINT allergens_pkey PRIMARY KEY (id);


--
-- Name: carbohydrates carbohydrates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carbohydrates
    ADD CONSTRAINT carbohydrates_pkey PRIMARY KEY (id);


--
-- Name: food_items food_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_items
    ADD CONSTRAINT food_items_pkey PRIMARY KEY (id);


--
-- Name: vitamins_and_minerals vitamins_and_minerals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vitamins_and_minerals
    ADD CONSTRAINT vitamins_and_minerals_pkey PRIMARY KEY (id);


--
-- Name: allergens allergens_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergens
    ADD CONSTRAINT allergens_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.food_items(id);


--
-- Name: carbohydrates carbohydrates_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carbohydrates
    ADD CONSTRAINT carbohydrates_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.food_items(id);


--
-- Name: vitamins_and_minerals vitamins_and_minerals_food_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vitamins_and_minerals
    ADD CONSTRAINT vitamins_and_minerals_food_item_id_fkey FOREIGN KEY (food_item_id) REFERENCES public.food_items(id);


--
-- PostgreSQL database dump complete
--

