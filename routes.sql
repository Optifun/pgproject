--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11
-- Dumped by pg_dump version 10.11

-- Started on 2020-01-20 17:48:16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 202 (class 1259 OID 17001)
-- Name: transport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transport (
    id integer NOT NULL,
    transport_type_id integer NOT NULL,
    name character varying(25) NOT NULL
);


ALTER TABLE public.transport OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17006)
-- Name: transport_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transport_type (
    id integer NOT NULL,
    name character varying(25) NOT NULL
);


ALTER TABLE public.transport_type OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17086)
-- Name: named_transport; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.named_transport AS
 SELECT tp.id,
    tp.name,
    tp.transport_type_id,
    ttype.name AS transport_type
   FROM (public.transport tp
     JOIN public.transport_type ttype ON ((ttype.id = tp.transport_type_id)));


ALTER TABLE public.named_transport OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16986)
-- Name: points; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.points (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.points OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16991)
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route (
    id integer NOT NULL,
    point_start integer NOT NULL,
    point_end integer NOT NULL,
    time_start abstime NOT NULL,
    time_arrive abstime NOT NULL,
    cost integer NOT NULL,
    count_tickets integer NOT NULL,
    transport_id integer
);


ALTER TABLE public.route OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 17090)
-- Name: named_route; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.named_route AS
 SELECT ro.id,
    ro.point_start AS point_start_id,
    endp.name AS point_start,
    ro.point_end AS point_end_id,
    stp.name AS point_end,
    ro.time_start,
    ro.time_arrive,
    ro.cost,
    ro.count_tickets,
    tp.name AS transport_name,
    tp.transport_type,
    tp.transport_type_id
   FROM (((public.route ro
     JOIN public.points endp ON ((endp.id = ro.point_start)))
     JOIN public.points stp ON ((stp.id = ro.point_end)))
     JOIN public.named_transport tp ON ((tp.id = ro.transport_id)));


ALTER TABLE public.named_route OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16989)
-- Name: points_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.points_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.points_id_seq OWNER TO postgres;

--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 197
-- Name: points_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.points_id_seq OWNED BY public.points.id;


--
-- TOC entry 199 (class 1259 OID 16994)
-- Name: route_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."route_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."route_ID_seq" OWNER TO postgres;

--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 199
-- Name: route_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."route_ID_seq" OWNED BY public.route.id;


--
-- TOC entry 200 (class 1259 OID 16996)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    route_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17011)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    fio character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17099)
-- Name: route_ticket; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.route_ticket AS
 SELECT tk.id,
    tk.route_id,
    tk.user_id,
    usr.fio AS user_fio,
    ro.point_start_id,
    ro.point_start,
    ro.point_end_id,
    ro.point_end,
    ro.time_start,
    ro.time_arrive,
    ro.cost,
    ro.count_tickets
   FROM (public.tickets tk
     JOIN public.users usr ON ((usr.id = tk.user_id))),
    public.named_route ro
  WHERE (ro.id = tk.route_id);


ALTER TABLE public.route_ticket OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16999)
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tickets ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tickets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 17004)
-- Name: transport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transport_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transport_id_seq OWNER TO postgres;

--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 203
-- Name: transport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transport_id_seq OWNED BY public.transport.id;


--
-- TOC entry 205 (class 1259 OID 17009)
-- Name: transport_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transport_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transport_type_id_seq OWNER TO postgres;

--
-- TOC entry 2869 (class 0 OID 0)
-- Dependencies: 205
-- Name: transport_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transport_type_id_seq OWNED BY public.transport_type.id;


--
-- TOC entry 207 (class 1259 OID 17017)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2713 (class 2604 OID 17019)
-- Name: points id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points ALTER COLUMN id SET DEFAULT nextval('public.points_id_seq'::regclass);


--
-- TOC entry 2714 (class 2604 OID 17020)
-- Name: route id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route ALTER COLUMN id SET DEFAULT nextval('public."route_ID_seq"'::regclass);


--
-- TOC entry 2715 (class 2604 OID 17021)
-- Name: transport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport ALTER COLUMN id SET DEFAULT nextval('public.transport_id_seq'::regclass);


--
-- TOC entry 2716 (class 2604 OID 17022)
-- Name: transport_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport_type ALTER COLUMN id SET DEFAULT nextval('public.transport_type_id_seq'::regclass);


--
-- TOC entry 2728 (class 2606 OID 17024)
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 2718 (class 2606 OID 17026)
-- Name: points points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 17028)
-- Name: route route_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT route_pkey PRIMARY KEY (id);


--
-- TOC entry 2722 (class 2606 OID 17030)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 17032)
-- Name: transport transport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport
    ADD CONSTRAINT transport_pkey PRIMARY KEY (id);


--
-- TOC entry 2726 (class 2606 OID 17034)
-- Name: transport_type transport_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport_type
    ADD CONSTRAINT transport_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2729 (class 2606 OID 17035)
-- Name: route foreign_end_point_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT foreign_end_point_id FOREIGN KEY (point_end) REFERENCES public.points(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2731 (class 2606 OID 17040)
-- Name: tickets foreign_route_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT foreign_route_id FOREIGN KEY (route_id) REFERENCES public.route(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2730 (class 2606 OID 17045)
-- Name: route foreign_start_point_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route
    ADD CONSTRAINT foreign_start_point_id FOREIGN KEY (point_start) REFERENCES public.points(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2733 (class 2606 OID 17050)
-- Name: transport foreign_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport
    ADD CONSTRAINT foreign_type_id FOREIGN KEY (transport_type_id) REFERENCES public.transport_type(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2732 (class 2606 OID 17055)
-- Name: tickets foreign_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT foreign_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE NOT VALID;


-- Completed on 2020-01-20 17:48:17

--
-- PostgreSQL database dump complete
--

