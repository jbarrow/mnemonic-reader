import zerorpc
import logging


logging.basicConfig(level=logging.INFO)


class MnemonicApi(object):

    def echo(self, text: str) -> str:
        return text


def parse_port():
    return 4242


def main():
    addr = f'tcp://127.0.0.1:{parse_port()}'
    s = zerorpc.Server(MnemonicApi())
    logging.info(f'starting server on {addr}')
    s.bind(addr)
    # logging.info(f'starting server on {addr}')
    s.run()


if __name__ == '__main__':
    main()
